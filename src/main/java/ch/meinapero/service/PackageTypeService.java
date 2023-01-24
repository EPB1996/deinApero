package ch.meinapero.service;

import ch.meinapero.domain.PackageType;
import ch.meinapero.repository.PackageTypeRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link PackageType}.
 */
@Service
public class PackageTypeService {

    private final Logger log = LoggerFactory.getLogger(PackageTypeService.class);

    private final PackageTypeRepository packageTypeRepository;

    public PackageTypeService(PackageTypeRepository packageTypeRepository) {
        this.packageTypeRepository = packageTypeRepository;
    }

    /**
     * Save a packageType.
     *
     * @param packageType the entity to save.
     * @return the persisted entity.
     */
    public Mono<PackageType> save(PackageType packageType) {
        log.debug("Request to save PackageType : {}", packageType);
        return packageTypeRepository.save(packageType);
    }

    /**
     * Update a packageType.
     *
     * @param packageType the entity to save.
     * @return the persisted entity.
     */
    public Mono<PackageType> update(PackageType packageType) {
        log.debug("Request to update PackageType : {}", packageType);
        return packageTypeRepository.save(packageType);
    }

    /**
     * Partially update a packageType.
     *
     * @param packageType the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<PackageType> partialUpdate(PackageType packageType) {
        log.debug("Request to partially update PackageType : {}", packageType);

        return packageTypeRepository
            .findById(packageType.getId())
            .map(existingPackageType -> {
                if (packageType.getName() != null) {
                    existingPackageType.setName(packageType.getName());
                }
                if (packageType.getDescription() != null) {
                    existingPackageType.setDescription(packageType.getDescription());
                }
                if (packageType.getPrice() != null) {
                    existingPackageType.setPrice(packageType.getPrice());
                }

                return existingPackageType;
            })
            .flatMap(packageTypeRepository::save);
    }

    /**
     * Get all the packageTypes.
     *
     * @return the list of entities.
     */
    public Flux<PackageType> findAll() {
        log.debug("Request to get all PackageTypes");
        return packageTypeRepository.findAll();
    }

    /**
     * Get all the packageTypes with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Flux<PackageType> findAllWithEagerRelationships(Pageable pageable) {
        return packageTypeRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Returns the number of packageTypes available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return packageTypeRepository.count();
    }

    /**
     * Get one packageType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Mono<PackageType> findOne(String id) {
        log.debug("Request to get PackageType : {}", id);
        return packageTypeRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the packageType by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(String id) {
        log.debug("Request to delete PackageType : {}", id);
        return packageTypeRepository.deleteById(id);
    }
}
