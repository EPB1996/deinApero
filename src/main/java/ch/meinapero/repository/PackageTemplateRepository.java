package ch.meinapero.repository;

import ch.meinapero.domain.PackageTemplate;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data MongoDB reactive repository for the PackageTemplate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PackageTemplateRepository extends ReactiveMongoRepository<PackageTemplate, String> {
    @Query("{}")
    Flux<PackageTemplate> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    Flux<PackageTemplate> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Mono<PackageTemplate> findOneWithEagerRelationships(String id);
}
