package ch.meinapero.web.rest;

import ch.meinapero.domain.PackageType;
import ch.meinapero.repository.PackageTypeRepository;
import ch.meinapero.service.PackageTypeService;
import ch.meinapero.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;

/**
 * REST controller for managing {@link ch.meinapero.domain.PackageType}.
 */
@RestController
@RequestMapping("/api")
public class PackageTypeResource {

    private final Logger log = LoggerFactory.getLogger(PackageTypeResource.class);

    private static final String ENTITY_NAME = "packageType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PackageTypeService packageTypeService;

    private final PackageTypeRepository packageTypeRepository;

    public PackageTypeResource(PackageTypeService packageTypeService, PackageTypeRepository packageTypeRepository) {
        this.packageTypeService = packageTypeService;
        this.packageTypeRepository = packageTypeRepository;
    }

    /**
     * {@code POST  /package-types} : Create a new packageType.
     *
     * @param packageType the packageType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new packageType, or with status {@code 400 (Bad Request)} if the packageType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/package-types")
    public Mono<ResponseEntity<PackageType>> createPackageType(@Valid @RequestBody PackageType packageType) throws URISyntaxException {
        log.debug("REST request to save PackageType : {}", packageType);
        if (packageType.getId() != null) {
            throw new BadRequestAlertException("A new packageType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return packageTypeService
            .save(packageType)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/package-types/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /package-types/:id} : Updates an existing packageType.
     *
     * @param id the id of the packageType to save.
     * @param packageType the packageType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated packageType,
     * or with status {@code 400 (Bad Request)} if the packageType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the packageType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/package-types/{id}")
    public Mono<ResponseEntity<PackageType>> updatePackageType(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody PackageType packageType
    ) throws URISyntaxException {
        log.debug("REST request to update PackageType : {}, {}", id, packageType);
        if (packageType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, packageType.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return packageTypeRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return packageTypeService
                    .update(packageType)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(result ->
                        ResponseEntity
                            .ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId()))
                            .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /package-types/:id} : Partial updates given fields of an existing packageType, field will ignore if it is null
     *
     * @param id the id of the packageType to save.
     * @param packageType the packageType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated packageType,
     * or with status {@code 400 (Bad Request)} if the packageType is not valid,
     * or with status {@code 404 (Not Found)} if the packageType is not found,
     * or with status {@code 500 (Internal Server Error)} if the packageType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/package-types/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<PackageType>> partialUpdatePackageType(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody PackageType packageType
    ) throws URISyntaxException {
        log.debug("REST request to partial update PackageType partially : {}, {}", id, packageType);
        if (packageType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, packageType.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return packageTypeRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<PackageType> result = packageTypeService.partialUpdate(packageType);

                return result
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(res ->
                        ResponseEntity
                            .ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, res.getId()))
                            .body(res)
                    );
            });
    }

    /**
     * {@code GET  /package-types} : get all the packageTypes.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of packageTypes in body.
     */
    @GetMapping("/package-types")
    public Mono<List<PackageType>> getAllPackageTypes(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all PackageTypes");
        return packageTypeService.findAll().collectList();
    }

    /**
     * {@code GET  /package-types} : get all the packageTypes as a stream.
     * @return the {@link Flux} of packageTypes.
     */
    @GetMapping(value = "/package-types", produces = MediaType.APPLICATION_NDJSON_VALUE)
    public Flux<PackageType> getAllPackageTypesAsStream() {
        log.debug("REST request to get all PackageTypes as a stream");
        return packageTypeService.findAll();
    }

    /**
     * {@code GET  /package-types/:id} : get the "id" packageType.
     *
     * @param id the id of the packageType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the packageType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/package-types/{id}")
    public Mono<ResponseEntity<PackageType>> getPackageType(@PathVariable String id) {
        log.debug("REST request to get PackageType : {}", id);
        Mono<PackageType> packageType = packageTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(packageType);
    }

    /**
     * {@code DELETE  /package-types/:id} : delete the "id" packageType.
     *
     * @param id the id of the packageType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/package-types/{id}")
    public Mono<ResponseEntity<Void>> deletePackageType(@PathVariable String id) {
        log.debug("REST request to delete PackageType : {}", id);
        return packageTypeService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build()
                )
            );
    }
}
