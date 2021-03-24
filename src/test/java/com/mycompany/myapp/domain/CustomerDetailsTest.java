package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class CustomerDetailsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerDetails.class);
        CustomerDetails customerDetails1 = new CustomerDetails();
        customerDetails1.setId(1L);
        CustomerDetails customerDetails2 = new CustomerDetails();
        customerDetails2.setId(customerDetails1.getId());
        assertThat(customerDetails1).isEqualTo(customerDetails2);
        customerDetails2.setId(2L);
        assertThat(customerDetails1).isNotEqualTo(customerDetails2);
        customerDetails1.setId(null);
        assertThat(customerDetails1).isNotEqualTo(customerDetails2);
    }
}
