package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.CustomerDetails;
import com.mycompany.myapp.repository.CustomerDetailsRepository;
import com.mycompany.myapp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link CustomerDetails}.
 */
@Service
@Transactional
public class CustomerDetailsService {

    private final Logger log = LoggerFactory.getLogger(CustomerDetailsService.class);

    private final CustomerDetailsRepository customerDetailsRepository;

    private final UserRepository userRepository;

    public CustomerDetailsService(CustomerDetailsRepository customerDetailsRepository, UserRepository userRepository) {
        this.customerDetailsRepository = customerDetailsRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save a customerDetails.
     *
     * @param customerDetails the entity to save.
     * @return the persisted entity.
     */
    public CustomerDetails save(CustomerDetails customerDetails) {
        log.debug("Request to save CustomerDetails : {}", customerDetails);
        Long userId = customerDetails.getUser().getId();
        userRepository.findById(userId).ifPresent(customerDetails::user);
        return customerDetailsRepository.save(customerDetails);
    }

    /**
     * Get all the customerDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<CustomerDetails> findAll(Pageable pageable) {
        log.debug("Request to get all CustomerDetails");
        return customerDetailsRepository.findAll(pageable);
    }



    /**
     *  Get all the customerDetails where ShoppingCart is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<CustomerDetails> findAllWhereShoppingCartIsNull() {
        log.debug("Request to get all customerDetails where ShoppingCart is null");
        return StreamSupport
            .stream(customerDetailsRepository.findAll().spliterator(), false)
            .filter(customerDetails -> customerDetails.getShoppingCart() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one customerDetails by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CustomerDetails> findOne(Long id) {
        log.debug("Request to get CustomerDetails : {}", id);
        return customerDetailsRepository.findById(id);
    }

    /**
     * Delete the customerDetails by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerDetails : {}", id);
        customerDetailsRepository.deleteById(id);
    }
}
