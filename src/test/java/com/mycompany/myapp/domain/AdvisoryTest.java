package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class AdvisoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Advisory.class);
        Advisory advisory1 = new Advisory();
        advisory1.setId(1L);
        Advisory advisory2 = new Advisory();
        advisory2.setId(advisory1.getId());
        assertThat(advisory1).isEqualTo(advisory2);
        advisory2.setId(2L);
        assertThat(advisory1).isNotEqualTo(advisory2);
        advisory1.setId(null);
        assertThat(advisory1).isNotEqualTo(advisory2);
    }
}
