package com.mycompany.myapp.domain;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Shopping cart to hold users orders
 */
@ApiModel(description = "Shopping cart to hold users orders")
@Entity
@Table(name = "shopping_cart")
public class ShoppingCart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @OneToOne

    @MapsId
    @JoinColumn(name = "id")
    private CustomerDetails customerDetails;

    @OneToMany(mappedBy = "cart")
    private Set<CartItem> cartItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CustomerDetails getCustomerDetails() {
        return customerDetails;
    }

    public ShoppingCart customerDetails(CustomerDetails customerDetails) {
        this.customerDetails = customerDetails;
        return this;
    }

    public void setCustomerDetails(CustomerDetails customerDetails) {
        this.customerDetails = customerDetails;
    }

    public Set<CartItem> getCartItems() {
        return cartItems;
    }

    public ShoppingCart cartItems(Set<CartItem> cartItems) {
        this.cartItems = cartItems;
        return this;
    }

    public ShoppingCart addCartItem(CartItem cartItem) {
        this.cartItems.add(cartItem);
        cartItem.setCart(this);
        return this;
    }

    public ShoppingCart removeCartItem(CartItem cartItem) {
        this.cartItems.remove(cartItem);
        cartItem.setCart(null);
        return this;
    }

    public void setCartItems(Set<CartItem> cartItems) {
        this.cartItems = cartItems;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ShoppingCart)) {
            return false;
        }
        return id != null && id.equals(((ShoppingCart) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ShoppingCart{" +
            "id=" + getId() +
            "}";
    }
}
