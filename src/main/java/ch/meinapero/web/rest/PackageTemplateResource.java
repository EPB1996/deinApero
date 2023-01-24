package ch.meinapero.web.rest;

import ch.meinapero.domain.PackageTemplate;
import ch.meinapero.repository.PackageTemplateRepository;
import ch.meinapero.service.PackageTemplateService;
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
 * REST controller for managing {@link ch.meinapero.domain.PackageTemplate}.
 */
@RestController
@RequestMapping("/api")
public class PackageTemplateResource {

    private final Logger log = LoggerFactory.getLogger(PackageTemplateResource.class);

    private static final String ENTITY_NAME = "packageTemplate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PackageTemplateService packageTemplateService;

    private final PackageTemplateRepository packageTemplateRepository;

    public PackageTemplateResource(PackageTemplateService packageTemplateService, PackageTemplateRepository packageTemplateRepository) {
        this.packageTemplateService = packageTemplateService;
        this.packageTemplateRepository = packageTemplateRepository;
    }

    /**
     * {@code POST  /package-templates} : Create a new packageTemplate.
     *
     * @param packageTemplate the packageTemplate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new packageTemplate, or with status {@code 400 (Bad Request)} if the packageTemplate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/package-templates")
    public Mono<ResponseEntity<PackageTemplate>> createPackageTemplate(@Valid @RequestBody PackageTemplate packageTemplate)
        throws URISyntaxException {
        log.debug("REST request to save PackageTemplate : {}", packageTemplate);
        if (packageTemplate.getId() != null) {
            throw new BadRequestAlertException("A new packageTemplate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return packageTemplateService
            .save(packageTemplate)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/package-templates/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /package-templates/:id} : Updates an existing packageTemplate.
     *
     * @param id the id of the packageTemplate to save.
     * @param packageTemplate the packageTemplate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated packageTemplate,
     * or with status {@code 400 (Bad Request)} if the packageTemplate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the packageTemplate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/package-templates/{id}")
    public Mono<ResponseEntity<PackageTemplate>> updatePackageTemplate(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody PackageTemplate packageTemplate
    ) throws URISyntaxException {
        log.debug("REST request to update PackageTemplate : {}, {}", id, packageTemplate);
        if (packageTemplate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, packageTemplate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return packageTemplateRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return packageTemplateService
                    .update(packageTemplate)
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
     * {@code PATCH  /package-templates/:id} : Partial updates given fields of an existing packageTemplate, field will ignore if it is null
     *
     * @param id the id of the packageTemplate to save.
     * @param packageTemplate the packageTemplate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated packageTemplate,
     * or with status {@code 400 (Bad Request)} if the packageTemplate is not valid,
     * or with status {@code 404 (Not Found)} if the packageTemplate is not found,
     * or with status {@code 500 (Internal Server Error)} if the packageTemplate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/package-templates/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<PackageTemplate>> partialUpdatePackageTemplate(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody PackageTemplate packageTemplate
    ) throws URISyntaxException {
        log.debug("REST request to partial update PackageTemplate partially : {}, {}", id, packageTemplate);
        if (packageTemplate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, packageTemplate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return packageTemplateRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<PackageTemplate> result = packageTemplateService.partialUpdate(packageTemplate);

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
     * {@code GET  /package-templates} : get all the packageTemplates.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of packageTemplates in body.
     */
    @GetMapping("/package-templates")
    public Mono<List<PackageTemplate>> getAllPackageTemplates(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all PackageTemplates");
        return packageTemplateService.findAll().collectList();
    }

    /**
     * {@code GET  /package-templates} : get all the packageTemplates as a stream.
     * @return the {@link Flux} of packageTemplates.
     */
    @GetMapping(value = "/package-templates", produces = MediaType.APPLICATION_NDJSON_VALUE)
    public Flux<PackageTemplate> getAllPackageTemplatesAsStream() {
        log.debug("REST request to get all PackageTemplates as a stream");
        return packageTemplateService.findAll();
    }

    /**
     * {@code GET  /package-templates/:id} : get the "id" packageTemplate.
     *
     * @param id the id of the packageTemplate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the packageTemplate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/package-templates/{id}")
    public Mono<ResponseEntity<PackageTemplate>> getPackageTemplate(@PathVariable String id) {
        log.debug("REST request to get PackageTemplate : {}", id);
        Mono<PackageTemplate> packageTemplate = packageTemplateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(packageTemplate);
    }

    /**
     * {@code DELETE  /package-templates/:id} : delete the "id" packageTemplate.
     *
     * @param id the id of the packageTemplate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/package-templates/{id}")
    public Mono<ResponseEntity<Void>> deletePackageTemplate(@PathVariable String id) {
        log.debug("REST request to delete PackageTemplate : {}", id);
        return packageTemplateService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build()
                )
            );
    }
}
