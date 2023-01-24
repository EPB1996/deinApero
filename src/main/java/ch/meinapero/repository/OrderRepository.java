package ch.meinapero.repository;

import ch.meinapero.domain.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data MongoDB reactive repository for the Order entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderRepository extends ReactiveMongoRepository<Order, String> {
    Flux<Order> findAllBy(Pageable pageable);

    @Query("{}")
    Flux<Order> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    Flux<Order> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Mono<Order> findOneWithEagerRelationships(String id);
}
