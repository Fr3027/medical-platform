package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.ShoppingCart;
import com.mycompany.myapp.repository.ShoppingCartRepository;
import com.mycompany.myapp.repository.CartItemRepository;
import com.mycompany.myapp.repository.CustomerDetailsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link ShoppingCart}.
 */
@Service
@Transactional
public class ShoppingCartService {

    private final Logger log = LoggerFactory.getLogger(ShoppingCartService.class);

    private final ShoppingCartRepository shoppingCartRepository;

    private final CustomerDetailsRepository customerDetailsRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public ShoppingCartService(ShoppingCartRepository shoppingCartRepository, CustomerDetailsRepository customerDetailsRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.customerDetailsRepository = customerDetailsRepository;
    }

    /**
     * Save a shoppingCart.
     *
     * @param shoppingCart the entity to save.
     * @return the persisted entity.
     */
    public ShoppingCart save(ShoppingCart shoppingCart) {
        log.debug("Request to save ShoppingCart : {}", shoppingCart);
        Long customerDetailsId = shoppingCart.getCustomerDetails().getId();
        customerDetailsRepository.findById(customerDetailsId).ifPresent(shoppingCart::customerDetails);
        return shoppingCartRepository.save(shoppingCart);
    }

    /**
     * Get all the shoppingCarts.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ShoppingCart> findAll() {
        log.debug("Request to get all ShoppingCarts");
        return shoppingCartRepository.findAll();
    }


    /**
     * Get one shoppingCart by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ShoppingCart> findOne(Long id) {
        log.debug("Request to get ShoppingCart : {}", id);
        return shoppingCartRepository.findById(id);
    }

    /**
     * Delete the shoppingCart by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ShoppingCart : {}", id);
        shoppingCartRepository.deleteById(id);
    }
    public void clear(Long id){
        log.debug("Request to clear ShoppingCart : {}", id);
        cartItemRepository.deleteByCartId(id);
    }
}
