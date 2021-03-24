package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Advisory;
import com.mycompany.myapp.repository.AdvisoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Advisory}.
 */
@Service
@Transactional
public class AdvisoryService {

    private final Logger log = LoggerFactory.getLogger(AdvisoryService.class);

    private final AdvisoryRepository advisoryRepository;

    public AdvisoryService(AdvisoryRepository advisoryRepository) {
        this.advisoryRepository = advisoryRepository;
    }

    /**
     * Save a advisory.
     *
     * @param advisory the entity to save.
     * @return the persisted entity.
     */
    public Advisory save(Advisory advisory) {
        log.debug("Request to save Advisory : {}", advisory);
        return advisoryRepository.save(advisory);
    }

    /**
     * Get all the advisories.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Advisory> findAll() {
        log.debug("Request to get all Advisories");
        return advisoryRepository.findAll();
    }


    /**
     * Get one advisory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Advisory> findOne(Long id) {
        log.debug("Request to get Advisory : {}", id);
        return advisoryRepository.findById(id);
    }

    /**
     * Delete the advisory by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Advisory : {}", id);
        advisoryRepository.deleteById(id);
    }
}
