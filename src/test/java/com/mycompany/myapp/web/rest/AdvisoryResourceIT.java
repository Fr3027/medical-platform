package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DemoApp;
import com.mycompany.myapp.domain.Advisory;
import com.mycompany.myapp.repository.AdvisoryRepository;
import com.mycompany.myapp.service.AdvisoryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AdvisoryResource} REST controller.
 */
@SpringBootTest(classes = DemoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AdvisoryResourceIT {

    private static final ZonedDateTime DEFAULT_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_UPDATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_UPDATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DETAIL = "AAAAAAAAAA";
    private static final String UPDATED_DETAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ANSWER = "AAAAAAAAAA";
    private static final String UPDATED_ANSWER = "BBBBBBBBBB";

    @Autowired
    private AdvisoryRepository advisoryRepository;

    @Autowired
    private AdvisoryService advisoryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAdvisoryMockMvc;

    private Advisory advisory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Advisory createEntity(EntityManager em) {
        Advisory advisory = new Advisory()
            .created(DEFAULT_CREATED)
            .updated(DEFAULT_UPDATED)
            .title(DEFAULT_TITLE)
            .detail(DEFAULT_DETAIL)
            .answer(DEFAULT_ANSWER);
        return advisory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Advisory createUpdatedEntity(EntityManager em) {
        Advisory advisory = new Advisory()
            .created(UPDATED_CREATED)
            .updated(UPDATED_UPDATED)
            .title(UPDATED_TITLE)
            .detail(UPDATED_DETAIL)
            .answer(UPDATED_ANSWER);
        return advisory;
    }

    @BeforeEach
    public void initTest() {
        advisory = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdvisory() throws Exception {
        int databaseSizeBeforeCreate = advisoryRepository.findAll().size();
        // Create the Advisory
        restAdvisoryMockMvc.perform(post("/api/advisories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(advisory)))
            .andExpect(status().isCreated());

        // Validate the Advisory in the database
        List<Advisory> advisoryList = advisoryRepository.findAll();
        assertThat(advisoryList).hasSize(databaseSizeBeforeCreate + 1);
        Advisory testAdvisory = advisoryList.get(advisoryList.size() - 1);
        assertThat(testAdvisory.getCreated()).isEqualTo(DEFAULT_CREATED);
        assertThat(testAdvisory.getUpdated()).isEqualTo(DEFAULT_UPDATED);
        assertThat(testAdvisory.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testAdvisory.getDetail()).isEqualTo(DEFAULT_DETAIL);
        assertThat(testAdvisory.getAnswer()).isEqualTo(DEFAULT_ANSWER);
    }

    @Test
    @Transactional
    public void createAdvisoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = advisoryRepository.findAll().size();

        // Create the Advisory with an existing ID
        advisory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdvisoryMockMvc.perform(post("/api/advisories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(advisory)))
            .andExpect(status().isBadRequest());

        // Validate the Advisory in the database
        List<Advisory> advisoryList = advisoryRepository.findAll();
        assertThat(advisoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAdvisories() throws Exception {
        // Initialize the database
        advisoryRepository.saveAndFlush(advisory);

        // Get all the advisoryList
        restAdvisoryMockMvc.perform(get("/api/advisories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(advisory.getId().intValue())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].updated").value(hasItem(sameInstant(DEFAULT_UPDATED))))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].detail").value(hasItem(DEFAULT_DETAIL)))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER)));
    }
    
    @Test
    @Transactional
    public void getAdvisory() throws Exception {
        // Initialize the database
        advisoryRepository.saveAndFlush(advisory);

        // Get the advisory
        restAdvisoryMockMvc.perform(get("/api/advisories/{id}", advisory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(advisory.getId().intValue()))
            .andExpect(jsonPath("$.created").value(sameInstant(DEFAULT_CREATED)))
            .andExpect(jsonPath("$.updated").value(sameInstant(DEFAULT_UPDATED)))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.detail").value(DEFAULT_DETAIL))
            .andExpect(jsonPath("$.answer").value(DEFAULT_ANSWER));
    }
    @Test
    @Transactional
    public void getNonExistingAdvisory() throws Exception {
        // Get the advisory
        restAdvisoryMockMvc.perform(get("/api/advisories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdvisory() throws Exception {
        // Initialize the database
        advisoryService.save(advisory);

        int databaseSizeBeforeUpdate = advisoryRepository.findAll().size();

        // Update the advisory
        Advisory updatedAdvisory = advisoryRepository.findById(advisory.getId()).get();
        // Disconnect from session so that the updates on updatedAdvisory are not directly saved in db
        em.detach(updatedAdvisory);
        updatedAdvisory
            .created(UPDATED_CREATED)
            .updated(UPDATED_UPDATED)
            .title(UPDATED_TITLE)
            .detail(UPDATED_DETAIL)
            .answer(UPDATED_ANSWER);

        restAdvisoryMockMvc.perform(put("/api/advisories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAdvisory)))
            .andExpect(status().isOk());

        // Validate the Advisory in the database
        List<Advisory> advisoryList = advisoryRepository.findAll();
        assertThat(advisoryList).hasSize(databaseSizeBeforeUpdate);
        Advisory testAdvisory = advisoryList.get(advisoryList.size() - 1);
        assertThat(testAdvisory.getCreated()).isEqualTo(UPDATED_CREATED);
        assertThat(testAdvisory.getUpdated()).isEqualTo(UPDATED_UPDATED);
        assertThat(testAdvisory.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testAdvisory.getDetail()).isEqualTo(UPDATED_DETAIL);
        assertThat(testAdvisory.getAnswer()).isEqualTo(UPDATED_ANSWER);
    }

    @Test
    @Transactional
    public void updateNonExistingAdvisory() throws Exception {
        int databaseSizeBeforeUpdate = advisoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdvisoryMockMvc.perform(put("/api/advisories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(advisory)))
            .andExpect(status().isBadRequest());

        // Validate the Advisory in the database
        List<Advisory> advisoryList = advisoryRepository.findAll();
        assertThat(advisoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAdvisory() throws Exception {
        // Initialize the database
        advisoryService.save(advisory);

        int databaseSizeBeforeDelete = advisoryRepository.findAll().size();

        // Delete the advisory
        restAdvisoryMockMvc.perform(delete("/api/advisories/{id}", advisory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Advisory> advisoryList = advisoryRepository.findAll();
        assertThat(advisoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
