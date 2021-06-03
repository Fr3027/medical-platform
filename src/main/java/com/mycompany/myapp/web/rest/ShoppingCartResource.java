package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CartItem;
import com.mycompany.myapp.domain.ProductOrder;
import com.mycompany.myapp.domain.ShoppingCart;
import com.mycompany.myapp.domain.enumeration.STATUS;
import com.mycompany.myapp.service.CartItemService;
import com.mycompany.myapp.service.CustomerDetailsService;
import com.mycompany.myapp.service.ProductOrderService;
import com.mycompany.myapp.service.ProductService;
import com.mycompany.myapp.service.ShoppingCartService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.ShoppingCart}.
 */
@RestController
@RequestMapping("/api")
public class ShoppingCartResource {
  private final Logger log = LoggerFactory.getLogger(ShoppingCartResource.class);

  private static final String ENTITY_NAME = "shoppingCart";

  @Value("${jhipster.clientApp.name}")
  private String applicationName;

  private final ShoppingCartService shoppingCartService;
  private final CustomerDetailsService customerDetailsService;
  private final UserDetailsService userDetailsService;
  private final ProductOrderService productOrderService;

  @Autowired
  private CartItemService cartItemService;

  public ShoppingCartResource(
    ShoppingCartService shoppingCartService,
    CustomerDetailsService customerDetailsService,
    UserDetailsService userDetailsService,
    ProductOrderService productOrderService
  ) {
    this.shoppingCartService = shoppingCartService;
    this.customerDetailsService = customerDetailsService;
    this.userDetailsService = userDetailsService;
    this.productOrderService = productOrderService;
  }

  /**
   * {@code POST  /shopping-carts} : Create a new shoppingCart.
   *
   * @param shoppingCart the shoppingCart to create.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new shoppingCart, or with status {@code 400 (Bad Request)} if the shoppingCart has already an ID.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PostMapping("/shopping-carts")
  public ResponseEntity<ShoppingCart> createShoppingCart(@RequestBody ShoppingCart shoppingCart) throws URISyntaxException {
    log.debug("REST request to save ShoppingCart : {}", shoppingCart);
    if (shoppingCart.getId() != null) {
      throw new BadRequestAlertException("A new shoppingCart cannot already have an ID", ENTITY_NAME, "idexists");
    }
    if (Objects.isNull(shoppingCart.getCustomerDetails())) {
      throw new BadRequestAlertException("Invalid association value provided", ENTITY_NAME, "null");
    }
    ShoppingCart result = shoppingCartService.save(shoppingCart);
    return ResponseEntity
      .created(new URI("/api/shopping-carts/" + result.getId()))
      .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
      .body(result);
  }

  @PostMapping("/checkout")
  public ResponseEntity<Void> checkout(@RequestBody CartItem[] cartItems) {
    if (cartItems.length > 0) {
      Long cart_id = cartItems[0].getCart().getId();
      for (CartItem cartItem : cartItems) {
        ProductOrder productOrder = new ProductOrder();
        productOrder.setQuantity(cartItem.getQuantity());
        productOrder.setTotalPrice((cartItem.getQuantity()) * (cartItem.getProduct().getPrice().intValue()));
        productOrder.setCreated(cartItem.getPlaceDate());
        productOrder.setAddress(
          customerDetailsService.findOne(cart_id).get().getAddressLine1() + customerDetailsService.findOne(cart_id).get().getAddressLine2()
        );
        productOrder.setStatus(STATUS.NEW);
        productOrder.setProduct(cartItem.getProduct());
        productOrder.setUser(customerDetailsService.findOne(cart_id).get().getUser());
        productOrderService.save(productOrder);
        cartItemService.save(cartItem);
      }
      shoppingCartService.clear(cart_id);
    }
    return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, "")).build();
  }

  /**
   * {@code PUT  /shopping-carts} : Updates an existing shoppingCart.
   *
   * @param shoppingCart the shoppingCart to update.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated shoppingCart,
   * or with status {@code 400 (Bad Request)} if the shoppingCart is not valid,
   * or with status {@code 500 (Internal Server Error)} if the shoppingCart couldn't be updated.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PutMapping("/shopping-carts")
  public ResponseEntity<ShoppingCart> updateShoppingCart(@RequestBody ShoppingCart shoppingCart) throws URISyntaxException {
    log.debug("REST request to update ShoppingCart : {}", shoppingCart);
    if (shoppingCart.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    ShoppingCart result = shoppingCartService.save(shoppingCart);
    return ResponseEntity
      .ok()
      .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, shoppingCart.getId().toString()))
      .body(result);
  }

  /**
   * {@code GET  /shopping-carts} : get all the shoppingCarts.
   *
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of shoppingCarts in body.
   */
  @GetMapping("/shopping-carts")
  public List<ShoppingCart> getAllShoppingCarts() {
    log.debug("REST request to get all ShoppingCarts");
    return shoppingCartService.findAll();
  }

  /**
   * {@code GET  /shopping-carts/:id} : get the "id" shoppingCart.
   *
   * @param id the id of the shoppingCart to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the shoppingCart, or with status {@code 404 (Not Found)}.
   */
  @GetMapping("/shopping-carts/{id}")
  public ResponseEntity<ShoppingCart> getShoppingCart(@PathVariable Long id) {
    log.debug("REST request to get ShoppingCart : {}", id);
    Optional<ShoppingCart> shoppingCart = shoppingCartService.findOne(id);
    return ResponseUtil.wrapOrNotFound(shoppingCart);
  }

  /**
   * {@code DELETE  /shopping-carts/:id} : delete the "id" shoppingCart.
   *
   * @param id the id of the shoppingCart to delete.
   * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
   */
  @DeleteMapping("/shopping-carts/{id}")
  public ResponseEntity<Void> deleteShoppingCart(@PathVariable Long id) {
    log.debug("REST request to delete ShoppingCart : {}", id);
    shoppingCartService.delete(id);
    return ResponseEntity
      .noContent()
      .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
      .build();
  }
}
