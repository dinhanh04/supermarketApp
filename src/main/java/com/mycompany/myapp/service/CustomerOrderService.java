package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.CustomerOrderDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.CustomerOrder}.
 */
public interface CustomerOrderService {
    /**
     * Save a customerOrder.
     *
     * @param customerOrderDTO the entity to save.
     * @return the persisted entity.
     */
    CustomerOrderDTO save(CustomerOrderDTO customerOrderDTO);

    /**
     * Updates a customerOrder.
     *
     * @param customerOrderDTO the entity to update.
     * @return the persisted entity.
     */
    CustomerOrderDTO update(CustomerOrderDTO customerOrderDTO);

    /**
     * Partially updates a customerOrder.
     *
     * @param customerOrderDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CustomerOrderDTO> partialUpdate(CustomerOrderDTO customerOrderDTO);

    /**
     * Get all the customerOrders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CustomerOrderDTO> findAll(Pageable pageable);

    /**
     * Get all the customerOrders with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CustomerOrderDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" customerOrder.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CustomerOrderDTO> findOne(Long id);

    /**
     * Delete the "id" customerOrder.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    CustomerOrderDTO createOrder(CustomerOrderDTO customerOrder);
}
