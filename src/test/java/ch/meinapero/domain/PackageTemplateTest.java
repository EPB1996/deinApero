package ch.meinapero.domain;

import static org.assertj.core.api.Assertions.assertThat;

import ch.meinapero.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PackageTemplateTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PackageTemplate.class);
        PackageTemplate packageTemplate1 = new PackageTemplate();
        packageTemplate1.setId("id1");
        PackageTemplate packageTemplate2 = new PackageTemplate();
        packageTemplate2.setId(packageTemplate1.getId());
        assertThat(packageTemplate1).isEqualTo(packageTemplate2);
        packageTemplate2.setId("id2");
        assertThat(packageTemplate1).isNotEqualTo(packageTemplate2);
        packageTemplate1.setId(null);
        assertThat(packageTemplate1).isNotEqualTo(packageTemplate2);
    }
}
