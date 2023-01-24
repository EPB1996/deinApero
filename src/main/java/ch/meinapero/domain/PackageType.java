package ch.meinapero.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A PackageType.
 */
@Document(collection = "package_type")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PackageType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @NotNull(message = "must not be null")
    @Field("price")
    private BigDecimal price;

    @Field("packageTemplate")
    private PackageTemplate packageTemplate;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public PackageType id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public PackageType name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public PackageType description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public PackageType price(BigDecimal price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public PackageTemplate getPackageTemplate() {
        return this.packageTemplate;
    }

    public void setPackageTemplate(PackageTemplate packageTemplate) {
        this.packageTemplate = packageTemplate;
    }

    public PackageType packageTemplate(PackageTemplate packageTemplate) {
        this.setPackageTemplate(packageTemplate);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PackageType)) {
            return false;
        }
        return id != null && id.equals(((PackageType) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PackageType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
