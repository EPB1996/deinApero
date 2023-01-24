package ch.meinapero.repository;

import ch.meinapero.domain.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data MongoDB reactive repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends ReactiveMongoRepository<Product, String> {
    Flux<Product> findAllBy(Pageable pageable);

    @Query("{}")
    Flux<Product> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    Flux<Product> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Mono<Product> findOneWithEagerRelationships(String id);
}
