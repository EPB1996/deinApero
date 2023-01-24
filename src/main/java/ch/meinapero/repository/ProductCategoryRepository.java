package ch.meinapero.repository;

import ch.meinapero.domain.ProductCategory;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB reactive repository for the ProductCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductCategoryRepository extends ReactiveMongoRepository<ProductCategory, String> {}
