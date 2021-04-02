package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

import com.mycompany.myapp.domain.enumeration.STATUS;

/**
 * Product order keeps track of orders
 */
@ApiModel(description = "Product order keeps track of orders")
@Entity
@Table(name = "product_order")
public class ProductOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 0)
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @NotNull
    @Min(value = 0)
    @Column(name = "total_price", nullable = false)
    private Integer totalPrice;

    @NotNull
    @Column(name = "created", nullable = false)
    private ZonedDateTime created;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private STATUS status;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "productOrders", allowSetters = true)
    private Product product;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "productOrders", allowSetters = true)
    private User user;

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

    public ProductOrder quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public ProductOrder totalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public ProductOrder created(ZonedDateTime created) {
        this.created = created;
        return this;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public String getAddress() {
        return address;
    }

    public ProductOrder address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public STATUS getStatus() {
        return status;
    }

    public ProductOrder status(STATUS status) {
        this.status = status;
        return this;
    }

    public void setStatus(STATUS status) {
        this.status = status;
    }

    public Product getProduct() {
        return product;
    }

    public ProductOrder product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public ProductOrder user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductOrder)) {
            return false;
        }
        return id != null && id.equals(((ProductOrder) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductOrder{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", totalPrice=" + getTotalPrice() +
            ", created='" + getCreated() + "'" +
            ", address='" + getAddress() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
