package ch.meinapero.service;

import ch.meinapero.domain.PackageTemplate;
import ch.meinapero.repository.PackageTemplateRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link PackageTemplate}.
 */
@Service
public class PackageTemplateService {

    private final Logger log = LoggerFactory.getLogger(PackageTemplateService.class);

    private final PackageTemplateRepository packageTemplateRepository;

    public PackageTemplateService(PackageTemplateRepository packageTemplateRepository) {
        this.packageTemplateRepository = packageTemplateRepository;
    }

    /**
     * Save a packageTemplate.
     *
     * @param packageTemplate the entity to save.
     * @return the persisted entity.
     */
    public Mono<PackageTemplate> save(PackageTemplate packageTemplate) {
        log.debug("Request to save PackageTemplate : {}", packageTemplate);
        return packageTemplateRepository.save(packageTemplate);
    }

    /**
     * Update a packageTemplate.
     *
     * @param packageTemplate the entity to save.
     * @return the persisted entity.
     */
    public Mono<PackageTemplate> update(PackageTemplate packageTemplate) {
        log.debug("Request to update PackageTemplate : {}", packageTemplate);
        return packageTemplateRepository.save(packageTemplate);
    }

    /**
     * Partially update a packageTemplate.
     *
     * @param packageTemplate the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<PackageTemplate> partialUpdate(PackageTemplate packageTemplate) {
        log.debug("Request to partially update PackageTemplate : {}", packageTemplate);

        return packageTemplateRepository
            .findById(packageTemplate.getId())
            .map(existingPackageTemplate -> {
                if (packageTemplate.getName() != null) {
                    existingPackageTemplate.setName(packageTemplate.getName());
                }

                return existingPackageTemplate;
            })
            .flatMap(packageTemplateRepository::save);
    }

    /**
     * Get all the packageTemplates.
     *
     * @return the list of entities.
     */
    public Flux<PackageTemplate> findAll() {
        log.debug("Request to get all PackageTemplates");
        return packageTemplateRepository.findAll();
    }

    /**
     * Get all the packageTemplates with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Flux<PackageTemplate> findAllWithEagerRelationships(Pageable pageable) {
        return packageTemplateRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Returns the number of packageTemplates available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return packageTemplateRepository.count();
    }

    /**
     * Get one packageTemplate by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Mono<PackageTemplate> findOne(String id) {
        log.debug("Request to get PackageTemplate : {}", id);
        return packageTemplateRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the packageTemplate by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(String id) {
        log.debug("Request to delete PackageTemplate : {}", id);
        return packageTemplateRepository.deleteById(id);
    }
}
