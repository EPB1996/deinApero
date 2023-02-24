package ch.meinapero.repository;

import ch.meinapero.domain.Customer;
import ch.meinapero.domain.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data MongoDB reactive repository for the Customer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRepository extends ReactiveMongoRepository<Customer, String> {
    Flux<Customer> findAllBy(Pageable pageable);

    @Query("{}")
    Flux<Customer> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    Flux<Customer> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Mono<Customer> findOneWithEagerRelationships(String id);
}
