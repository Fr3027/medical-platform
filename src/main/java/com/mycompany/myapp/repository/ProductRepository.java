package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select product from Product product where product.user.login = ?#{principal.username}")
    List<Product> findByUserIsCurrentUser();
    Page<Product> findByNameContaining(Pageable pageable,String search);
}
