package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class CartItemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CartItem.class);
        CartItem cartItem1 = new CartItem();
        cartItem1.setId(1L);
        CartItem cartItem2 = new CartItem();
        cartItem2.setId(cartItem1.getId());
        assertThat(cartItem1).isEqualTo(cartItem2);
        cartItem2.setId(2L);
        assertThat(cartItem1).isNotEqualTo(cartItem2);
        cartItem1.setId(null);
        assertThat(cartItem1).isNotEqualTo(cartItem2);
    }
}
