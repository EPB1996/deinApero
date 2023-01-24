package ch.meinapero.repository;

import ch.meinapero.domain.PackageType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data MongoDB reactive repository for the PackageType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PackageTypeRepository extends ReactiveMongoRepository<PackageType, String> {
    @Query("{}")
    Flux<PackageType> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    Flux<PackageType> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Mono<PackageType> findOneWithEagerRelationships(String id);
}
