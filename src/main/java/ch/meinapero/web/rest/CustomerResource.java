package ch.meinapero.web.rest;

import ch.meinapero.domain.Customer;
import ch.meinapero.repository.CustomerRepository;
import ch.meinapero.service.CustomerService;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;

/**
 * REST controller for managing {@link ch.meinapero.domain.Customer}.
 */
@RestController
@RequestMapping("/api")
public class CustomerResource {

    private final Logger log = LoggerFactory.getLogger(CustomerResource.class);

    private static final String ENTITY_NAME = "customer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomerService customerService;

    private final CustomerRepository customerRepository;

    public CustomerResource(CustomerService customerService, CustomerRepository customerRepository) {
        this.customerService = customerService;
        this.customerRepository = customerRepository;
    }

    /**
     * {@code POST  /customers} : Create a new customer.
     *
     * @param customer the customer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customer, or with status {@code 400 (Bad Request)} if the customer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/customers")
    public Mono<ResponseEntity<Customer>> createCustomer(@Valid @RequestBody Customer customer) throws URISyntaxException {
        log.debug("REST request to save Customer : {}", customer);
        if (customer.getId() != null) {
            throw new BadRequestAlertException("A new customer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return customerService
            .save(customer)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/customers/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /customers/:id} : Updates an existing customer.
     *
     * @param id the id of the customer to save.
     * @param customer the customer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customer,
     * or with status {@code 400 (Bad Request)} if the customer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/customers/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Mono<ResponseEntity<Customer>> updateCustomer(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody Customer customer
    ) throws URISyntaxException {
        log.debug("REST request to update Customer : {}, {}", id, customer);
        if (customer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, customer.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return customerRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return customerService
                    .update(customer)
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
     * {@code PATCH  /customers/:id} : Partial updates given fields of an existing customer, field will ignore if it is null
     *
     * @param id the id of the customer to save.
     * @param customer the customer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customer,
     * or with status {@code 400 (Bad Request)} if the customer is not valid,
     * or with status {@code 404 (Not Found)} if the customer is not found,
     * or with status {@code 500 (Internal Server Error)} if the customer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/customers/{id}", consumes = { "application/json", "application/merge-patch+json" })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Mono<ResponseEntity<Customer>> partialUpdateCustomer(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Customer customer
    ) throws URISyntaxException {
        log.debug("REST request to partial update Customer partially : {}, {}", id, customer);
        if (customer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, customer.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return customerRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<Customer> result = customerService.partialUpdate(customer);

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
     * {@code GET  /customers} : get all the customers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customers in body.
     */
    @GetMapping("/customers")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Mono<List<Customer>> getAllCustomers() {
        log.debug("REST request to get all Customers");
        return customerService.findAll().collectList();
    }

    /**
     * {@code GET  /customers} : get all the customers as a stream.
     * @return the {@link Flux} of customers.
     */
    @GetMapping(value = "/customers", produces = MediaType.APPLICATION_NDJSON_VALUE)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Flux<Customer> getAllCustomersAsStream() {
        log.debug("REST request to get all Customers as a stream");
        return customerService.findAll();
    }

    /**
     * {@code GET  /customers/:id} : get the "id" customer.
     *
     * @param id the id of the customer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/customers/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Mono<ResponseEntity<Customer>> getCustomer(@PathVariable String id) {
        log.debug("REST request to get Customer : {}", id);
        Mono<Customer> customer = customerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(customer);
    }

    /**
     * {@code DELETE  /customers/:id} : delete the "id" customer.
     *
     * @param id the id of the customer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/customers/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Mono<ResponseEntity<Void>> deleteCustomer(@PathVariable String id) {
        log.debug("REST request to delete Customer : {}", id);
        return customerService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build()
                )
            );
    }
}
