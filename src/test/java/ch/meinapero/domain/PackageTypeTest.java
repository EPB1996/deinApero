package ch.meinapero.domain;

import static org.assertj.core.api.Assertions.assertThat;

import ch.meinapero.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PackageTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PackageType.class);
        PackageType packageType1 = new PackageType();
        packageType1.setId("id1");
        PackageType packageType2 = new PackageType();
        packageType2.setId(packageType1.getId());
        assertThat(packageType1).isEqualTo(packageType2);
        packageType2.setId("id2");
        assertThat(packageType1).isNotEqualTo(packageType2);
        packageType1.setId(null);
        assertThat(packageType1).isNotEqualTo(packageType2);
    }
}
