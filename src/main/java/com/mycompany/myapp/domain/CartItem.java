package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A CartItem.
 */
@Entity
@Table(name = "cart_item")
public class CartItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 0)
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "place_date")
    private ZonedDateTime placeDate;

    @ManyToOne
    @JsonIgnoreProperties(value = "cartItems", allowSetters = true)
    private Product product;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "cartItems", allowSetters = true)
    private ShoppingCart cart;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public CartItem quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ZonedDateTime getPlaceDate() {
        return placeDate;
    }

    public CartItem placeDate(ZonedDateTime placeDate) {
        this.placeDate = placeDate;
        return this;
    }

    public void setPlaceDate(ZonedDateTime placeDate) {
        this.placeDate = placeDate;
    }

    public Product getProduct() {
        return product;
    }

    public CartItem product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public ShoppingCart getCart() {
        return cart;
    }

    public CartItem cart(ShoppingCart shoppingCart) {
        this.cart = shoppingCart;
        return this;
    }

    public void setCart(ShoppingCart shoppingCart) {
        this.cart = shoppingCart;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CartItem)) {
            return false;
        }
        return id != null && id.equals(((CartItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CartItem{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", placeDate='" + getPlaceDate() + "'" +
            "}";
    }
}
