package ch.meinapero.repository;

import ch.meinapero.domain.OrderItem;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data MongoDB reactive repository for the OrderItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderItemRepository extends ReactiveMongoRepository<OrderItem, String> {
    Flux<OrderItem> findAllBy(Pageable pageable);

    @Query("{}")
    Flux<OrderItem> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    Flux<OrderItem> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Mono<OrderItem> findOneWithEagerRelationships(String id);
}
