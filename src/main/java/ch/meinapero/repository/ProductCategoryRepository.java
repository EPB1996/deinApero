package ch.meinapero.repository;

import ch.meinapero.domain.ProductCategory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data MongoDB reactive repository for the ProductCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductCategoryRepository extends ReactiveMongoRepository<ProductCategory, String> {
    @Query("{}")
    Flux<ProductCategory> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    Flux<ProductCategory> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Mono<ProductCategory> findOneWithEagerRelationships(String id);
}
