package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.NotificationReceiptDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.NotificationReceipt}.
 */
public interface NotificationReceiptService {
    /**
     * Save a notificationReceipt.
     *
     * @param notificationReceiptDTO the entity to save.
     * @return the persisted entity.
     */
    NotificationReceiptDTO save(NotificationReceiptDTO notificationReceiptDTO);

    /**
     * Updates a notificationReceipt.
     *
     * @param notificationReceiptDTO the entity to update.
     * @return the persisted entity.
     */
    NotificationReceiptDTO update(NotificationReceiptDTO notificationReceiptDTO);

    /**
     * Partially updates a notificationReceipt.
     *
     * @param notificationReceiptDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<NotificationReceiptDTO> partialUpdate(NotificationReceiptDTO notificationReceiptDTO);

    /**
     * Get all the notificationReceipts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<NotificationReceiptDTO> findAll(Pageable pageable);

    /**
     * Get the "id" notificationReceipt.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NotificationReceiptDTO> findOne(Long id);

    /**
     * Delete the "id" notificationReceipt.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
