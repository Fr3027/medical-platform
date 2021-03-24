package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Advisory;
import com.mycompany.myapp.service.AdvisoryService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Advisory}.
 */
@RestController
@RequestMapping("/api")
public class AdvisoryResource {

    private final Logger log = LoggerFactory.getLogger(AdvisoryResource.class);

    private static final String ENTITY_NAME = "advisory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AdvisoryService advisoryService;

    public AdvisoryResource(AdvisoryService advisoryService) {
        this.advisoryService = advisoryService;
    }

    /**
     * {@code POST  /advisories} : Create a new advisory.
     *
     * @param advisory the advisory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new advisory, or with status {@code 400 (Bad Request)} if the advisory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/advisories")
    public ResponseEntity<Advisory> createAdvisory(@RequestBody Advisory advisory) throws URISyntaxException {
        log.debug("REST request to save Advisory : {}", advisory);
        if (advisory.getId() != null) {
            throw new BadRequestAlertException("A new advisory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Advisory result = advisoryService.save(advisory);
        return ResponseEntity.created(new URI("/api/advisories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /advisories} : Updates an existing advisory.
     *
     * @param advisory the advisory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated advisory,
     * or with status {@code 400 (Bad Request)} if the advisory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the advisory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/advisories")
    public ResponseEntity<Advisory> updateAdvisory(@RequestBody Advisory advisory) throws URISyntaxException {
        log.debug("REST request to update Advisory : {}", advisory);
        if (advisory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Advisory result = advisoryService.save(advisory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, advisory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /advisories} : get all the advisories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of advisories in body.
     */
    @GetMapping("/advisories")
    public List<Advisory> getAllAdvisories() {
        log.debug("REST request to get all Advisories");
        return advisoryService.findAll();
    }

    /**
     * {@code GET  /advisories/:id} : get the "id" advisory.
     *
     * @param id the id of the advisory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the advisory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/advisories/{id}")
    public ResponseEntity<Advisory> getAdvisory(@PathVariable Long id) {
        log.debug("REST request to get Advisory : {}", id);
        Optional<Advisory> advisory = advisoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(advisory);
    }

    /**
     * {@code DELETE  /advisories/:id} : delete the "id" advisory.
     *
     * @param id the id of the advisory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/advisories/{id}")
    public ResponseEntity<Void> deleteAdvisory(@PathVariable Long id) {
        log.debug("REST request to delete Advisory : {}", id);
        advisoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
