package ch.meinapero.domain;

import ch.meinapero.domain.enumeration.Size;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Product sold by the Online store
 */
@Schema(description = "Product sold by the Online store")
@Document(collection = "product")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @NotNull(message = "must not be null")
    @DecimalMin(value = "0")
    @Field("price")
    private BigDecimal price;

    @NotNull(message = "must not be null")
    @Field("product_size")
    private Size productSize;

    @Field("image")
    private byte[] image;

    @Field("image_content_type")
    private String imageContentType;

    @Field("packageTemplates")
    @JsonIgnoreProperties(value = { "products" }, allowSetters = true)
    private Set<PackageTemplate> packageTemplates = new HashSet<>();

    @Field("productCategories")
    @JsonIgnoreProperties(value = { "products" }, allowSetters = true)
    private Set<ProductCategory> productCategories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Product id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Product name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public Product description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public Product price(BigDecimal price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Size getProductSize() {
        return this.productSize;
    }

    public Product productSize(Size productSize) {
        this.setProductSize(productSize);
        return this;
    }

    public void setProductSize(Size productSize) {
        this.productSize = productSize;
    }

    public byte[] getImage() {
        return this.image;
    }

    public Product image(byte[] image) {
        this.setImage(image);
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return this.imageContentType;
    }

    public Product imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Set<PackageTemplate> getPackageTemplates() {
        return this.packageTemplates;
    }

    public void setPackageTemplates(Set<PackageTemplate> packageTemplates) {
        if (this.packageTemplates != null) {
            this.packageTemplates.forEach(i -> i.removeProduct(this));
        }
        if (packageTemplates != null) {
            packageTemplates.forEach(i -> i.addProduct(this));
        }
        this.packageTemplates = packageTemplates;
    }

    public Product packageTemplates(Set<PackageTemplate> packageTemplates) {
        this.setPackageTemplates(packageTemplates);
        return this;
    }

    public Product addPackageTemplate(PackageTemplate packageTemplate) {
        this.packageTemplates.add(packageTemplate);
        packageTemplate.getProducts().add(this);
        return this;
    }

    public Product removePackageTemplate(PackageTemplate packageTemplate) {
        this.packageTemplates.remove(packageTemplate);
        packageTemplate.getProducts().remove(this);
        return this;
    }

    public Set<ProductCategory> getProductCategories() {
        return this.productCategories;
    }

    public void setProductCategories(Set<ProductCategory> productCategories) {
        if (this.productCategories != null) {
            this.productCategories.forEach(i -> i.removeProduct(this));
        }
        if (productCategories != null) {
            productCategories.forEach(i -> i.addProduct(this));
        }
        this.productCategories = productCategories;
    }

    public Product productCategories(Set<ProductCategory> productCategories) {
        this.setProductCategories(productCategories);
        return this;
    }

    public Product addProductCategory(ProductCategory productCategory) {
        this.productCategories.add(productCategory);
        productCategory.getProducts().add(this);
        return this;
    }

    public Product removeProductCategory(ProductCategory productCategory) {
        this.productCategories.remove(productCategory);
        productCategory.getProducts().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            ", productSize='" + getProductSize() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            "}";
    }
}
