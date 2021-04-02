package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CartItem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CartItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
