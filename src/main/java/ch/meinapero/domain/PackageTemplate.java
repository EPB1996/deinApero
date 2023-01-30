package ch.meinapero.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A PackageTemplate.
 */
@Document(collection = "package_template")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PackageTemplate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("name")
    private String name;

    @Field("products")
    @JsonIgnoreProperties(value = { "packageTemplates", "productCategories" }, allowSetters = true)
    private Set<Product> products = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public PackageTemplate id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public PackageTemplate name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Product> getProducts() {
        return this.products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public PackageTemplate products(Set<Product> products) {
        this.setProducts(products);
        return this;
    }

    public PackageTemplate addProduct(Product product) {
        this.products.add(product);
        product.getPackageTemplates().add(this);
        return this;
    }

    public PackageTemplate removeProduct(Product product) {
        this.products.remove(product);
        product.getPackageTemplates().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PackageTemplate)) {
            return false;
        }
        return id != null && id.equals(((PackageTemplate) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PackageTemplate{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
