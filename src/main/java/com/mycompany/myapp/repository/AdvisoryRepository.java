package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Advisory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Advisory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdvisoryRepository extends JpaRepository<Advisory, Long> {

    @Query("select advisory from Advisory advisory where advisory.user.login = ?#{principal.username}")
    List<Advisory> findByUserIsCurrentUser();
}
