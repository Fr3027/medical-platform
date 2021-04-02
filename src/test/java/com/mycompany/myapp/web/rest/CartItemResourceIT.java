package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DemoApp;
import com.mycompany.myapp.domain.CartItem;
import com.mycompany.myapp.domain.ShoppingCart;
import com.mycompany.myapp.repository.CartItemRepository;
import com.mycompany.myapp.service.CartItemService;

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
 * Integration tests for the {@link CartItemResource} REST controller.
 */
@SpringBootTest(classes = DemoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CartItemResourceIT {

    private static final Integer DEFAULT_QUANTITY = 0;
    private static final Integer UPDATED_QUANTITY = 1;

    private static final ZonedDateTime DEFAULT_PLACE_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PLACE_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCartItemMockMvc;

    private CartItem cartItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CartItem createEntity(EntityManager em) {
        CartItem cartItem = new CartItem()
            .quantity(DEFAULT_QUANTITY)
            .placeDate(DEFAULT_PLACE_DATE);
        // Add required entity
        ShoppingCart shoppingCart;
        if (TestUtil.findAll(em, ShoppingCart.class).isEmpty()) {
            shoppingCart = ShoppingCartResourceIT.createEntity(em);
            em.persist(shoppingCart);
            em.flush();
        } else {
            shoppingCart = TestUtil.findAll(em, ShoppingCart.class).get(0);
        }
        cartItem.setCart(shoppingCart);
        return cartItem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CartItem createUpdatedEntity(EntityManager em) {
        CartItem cartItem = new CartItem()
            .quantity(UPDATED_QUANTITY)
            .placeDate(UPDATED_PLACE_DATE);
        // Add required entity
        ShoppingCart shoppingCart;
        if (TestUtil.findAll(em, ShoppingCart.class).isEmpty()) {
            shoppingCart = ShoppingCartResourceIT.createUpdatedEntity(em);
            em.persist(shoppingCart);
            em.flush();
        } else {
            shoppingCart = TestUtil.findAll(em, ShoppingCart.class).get(0);
        }
        cartItem.setCart(shoppingCart);
        return cartItem;
    }

    @BeforeEach
    public void initTest() {
        cartItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createCartItem() throws Exception {
        int databaseSizeBeforeCreate = cartItemRepository.findAll().size();
        // Create the CartItem
        restCartItemMockMvc.perform(post("/api/cart-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cartItem)))
            .andExpect(status().isCreated());

        // Validate the CartItem in the database
        List<CartItem> cartItemList = cartItemRepository.findAll();
        assertThat(cartItemList).hasSize(databaseSizeBeforeCreate + 1);
        CartItem testCartItem = cartItemList.get(cartItemList.size() - 1);
        assertThat(testCartItem.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testCartItem.getPlaceDate()).isEqualTo(DEFAULT_PLACE_DATE);
    }

    @Test
    @Transactional
    public void createCartItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cartItemRepository.findAll().size();

        // Create the CartItem with an existing ID
        cartItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCartItemMockMvc.perform(post("/api/cart-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cartItem)))
            .andExpect(status().isBadRequest());

        // Validate the CartItem in the database
        List<CartItem> cartItemList = cartItemRepository.findAll();
        assertThat(cartItemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = cartItemRepository.findAll().size();
        // set the field null
        cartItem.setQuantity(null);

        // Create the CartItem, which fails.


        restCartItemMockMvc.perform(post("/api/cart-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cartItem)))
            .andExpect(status().isBadRequest());

        List<CartItem> cartItemList = cartItemRepository.findAll();
        assertThat(cartItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCartItems() throws Exception {
        // Initialize the database
        cartItemRepository.saveAndFlush(cartItem);

        // Get all the cartItemList
        restCartItemMockMvc.perform(get("/api/cart-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cartItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].placeDate").value(hasItem(sameInstant(DEFAULT_PLACE_DATE))));
    }
    
    @Test
    @Transactional
    public void getCartItem() throws Exception {
        // Initialize the database
        cartItemRepository.saveAndFlush(cartItem);

        // Get the cartItem
        restCartItemMockMvc.perform(get("/api/cart-items/{id}", cartItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cartItem.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.placeDate").value(sameInstant(DEFAULT_PLACE_DATE)));
    }
    @Test
    @Transactional
    public void getNonExistingCartItem() throws Exception {
        // Get the cartItem
        restCartItemMockMvc.perform(get("/api/cart-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCartItem() throws Exception {
        // Initialize the database
        cartItemService.save(cartItem);

        int databaseSizeBeforeUpdate = cartItemRepository.findAll().size();

        // Update the cartItem
        CartItem updatedCartItem = cartItemRepository.findById(cartItem.getId()).get();
        // Disconnect from session so that the updates on updatedCartItem are not directly saved in db
        em.detach(updatedCartItem);
        updatedCartItem
            .quantity(UPDATED_QUANTITY)
            .placeDate(UPDATED_PLACE_DATE);

        restCartItemMockMvc.perform(put("/api/cart-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCartItem)))
            .andExpect(status().isOk());

        // Validate the CartItem in the database
        List<CartItem> cartItemList = cartItemRepository.findAll();
        assertThat(cartItemList).hasSize(databaseSizeBeforeUpdate);
        CartItem testCartItem = cartItemList.get(cartItemList.size() - 1);
        assertThat(testCartItem.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testCartItem.getPlaceDate()).isEqualTo(UPDATED_PLACE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCartItem() throws Exception {
        int databaseSizeBeforeUpdate = cartItemRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCartItemMockMvc.perform(put("/api/cart-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cartItem)))
            .andExpect(status().isBadRequest());

        // Validate the CartItem in the database
        List<CartItem> cartItemList = cartItemRepository.findAll();
        assertThat(cartItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCartItem() throws Exception {
        // Initialize the database
        cartItemService.save(cartItem);

        int databaseSizeBeforeDelete = cartItemRepository.findAll().size();

        // Delete the cartItem
        restCartItemMockMvc.perform(delete("/api/cart-items/{id}", cartItem.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CartItem> cartItemList = cartItemRepository.findAll();
        assertThat(cartItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
