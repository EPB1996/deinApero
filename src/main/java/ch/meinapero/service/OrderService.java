package ch.meinapero.service;

import ch.meinapero.domain.Order;
import ch.meinapero.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link Order}.
 */
@Service
public class OrderService {

    private final Logger log = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    /**
     * Save a order.
     *
     * @param order the entity to save.
     * @return the persisted entity.
     */
    public Mono<Order> save(Order order) {
        log.debug("Request to save Order : {}", order);
        return orderRepository.save(order);
    }

    /**
     * Update a order.
     *
     * @param order the entity to save.
     * @return the persisted entity.
     */
    public Mono<Order> update(Order order) {
        log.debug("Request to update Order : {}", order);
        return orderRepository.save(order);
    }

    /**
     * Partially update a order.
     *
     * @param order the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<Order> partialUpdate(Order order) {
        log.debug("Request to partially update Order : {}", order);

        return orderRepository
            .findById(order.getId())
            .map(existingOrder -> {
                if (order.getPlacedDate() != null) {
                    existingOrder.setPlacedDate(order.getPlacedDate());
                }
                if (order.getStatus() != null) {
                    existingOrder.setStatus(order.getStatus());
                }
                if (order.getCode() != null) {
                    existingOrder.setCode(order.getCode());
                }
                if (order.getInvoiceId() != null) {
                    existingOrder.setInvoiceId(order.getInvoiceId());
                }

                return existingOrder;
            })
            .flatMap(orderRepository::save);
    }

    /**
     * Get all the orders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Flux<Order> findAll(Pageable pageable) {
        log.debug("Request to get all Orders");
        return orderRepository.findAllBy(pageable);
    }

    /**
     * Get all the orders with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Flux<Order> findAllWithEagerRelationships(Pageable pageable) {
        return orderRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Returns the number of orders available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return orderRepository.count();
    }

    /**
     * Get one order by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Mono<Order> findOne(String id) {
        log.debug("Request to get Order : {}", id);
        return orderRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the order by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(String id) {
        log.debug("Request to delete Order : {}", id);
        return orderRepository.deleteById(id);
    }
}
