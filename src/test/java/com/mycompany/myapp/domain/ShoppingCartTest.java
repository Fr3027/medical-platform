package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class ShoppingCartTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShoppingCart.class);
        ShoppingCart shoppingCart1 = new ShoppingCart();
        shoppingCart1.setId(1L);
        ShoppingCart shoppingCart2 = new ShoppingCart();
        shoppingCart2.setId(shoppingCart1.getId());
        assertThat(shoppingCart1).isEqualTo(shoppingCart2);
        shoppingCart2.setId(2L);
        assertThat(shoppingCart1).isNotEqualTo(shoppingCart2);
        shoppingCart1.setId(null);
        assertThat(shoppingCart1).isNotEqualTo(shoppingCart2);
    }
}
