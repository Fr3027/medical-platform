package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.CartItem;
import com.mycompany.myapp.repository.CartItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CartItem}.
 */
@Service
@Transactional
public class CartItemService {

    private final Logger log = LoggerFactory.getLogger(CartItemService.class);

    private final CartItemRepository cartItemRepository;

    public CartItemService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    /**
     * Save a cartItem.
     *
     * @param cartItem the entity to save.
     * @return the persisted entity.
     */
    public CartItem save(CartItem cartItem) {
        log.debug("Request to save CartItem : {}", cartItem);
        return cartItemRepository.save(cartItem);
    }

    /**
     * Get all the cartItems.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CartItem> findAll() {
        log.debug("Request to get all CartItems");
        return cartItemRepository.findAll();
    }


    /**
     * Get one cartItem by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CartItem> findOne(Long id) {
        log.debug("Request to get CartItem : {}", id);
        return cartItemRepository.findById(id);
    }

    /**
     * Delete the cartItem by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CartItem : {}", id);
        cartItemRepository.deleteById(id);
    }
}
