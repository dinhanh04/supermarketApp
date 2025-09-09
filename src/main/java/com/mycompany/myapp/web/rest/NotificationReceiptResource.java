package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.NotificationReceiptRepository;
import com.mycompany.myapp.service.NotificationReceiptService;
import com.mycompany.myapp.service.dto.NotificationReceiptDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.NotificationReceipt}.
 */
@RestController
@RequestMapping("/api/notification-receipts")
public class NotificationReceiptResource {

    private static final Logger LOG = LoggerFactory.getLogger(NotificationReceiptResource.class);

    private static final String ENTITY_NAME = "notificationReceipt";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NotificationReceiptService notificationReceiptService;

    private final NotificationReceiptRepository notificationReceiptRepository;

    public NotificationReceiptResource(
        NotificationReceiptService notificationReceiptService,
        NotificationReceiptRepository notificationReceiptRepository
    ) {
        this.notificationReceiptService = notificationReceiptService;
        this.notificationReceiptRepository = notificationReceiptRepository;
    }

    /**
     * {@code POST  /notification-receipts} : Create a new notificationReceipt.
     *
     * @param notificationReceiptDTO the notificationReceiptDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new notificationReceiptDTO, or with status {@code 400 (Bad Request)} if the notificationReceipt has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<NotificationReceiptDTO> createNotificationReceipt(
        @Valid @RequestBody NotificationReceiptDTO notificationReceiptDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to save NotificationReceipt : {}", notificationReceiptDTO);
        if (notificationReceiptDTO.getId() != null) {
            throw new BadRequestAlertException("A new notificationReceipt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        notificationReceiptDTO = notificationReceiptService.save(notificationReceiptDTO);
        return ResponseEntity.created(new URI("/api/notification-receipts/" + notificationReceiptDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, notificationReceiptDTO.getId().toString()))
            .body(notificationReceiptDTO);
    }

    /**
     * {@code PUT  /notification-receipts/:id} : Updates an existing notificationReceipt.
     *
     * @param id the id of the notificationReceiptDTO to save.
     * @param notificationReceiptDTO the notificationReceiptDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated notificationReceiptDTO,
     * or with status {@code 400 (Bad Request)} if the notificationReceiptDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the notificationReceiptDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<NotificationReceiptDTO> updateNotificationReceipt(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody NotificationReceiptDTO notificationReceiptDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update NotificationReceipt : {}, {}", id, notificationReceiptDTO);
        if (notificationReceiptDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, notificationReceiptDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!notificationReceiptRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        notificationReceiptDTO = notificationReceiptService.update(notificationReceiptDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, notificationReceiptDTO.getId().toString()))
            .body(notificationReceiptDTO);
    }

    /**
     * {@code PATCH  /notification-receipts/:id} : Partial updates given fields of an existing notificationReceipt, field will ignore if it is null
     *
     * @param id the id of the notificationReceiptDTO to save.
     * @param notificationReceiptDTO the notificationReceiptDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated notificationReceiptDTO,
     * or with status {@code 400 (Bad Request)} if the notificationReceiptDTO is not valid,
     * or with status {@code 404 (Not Found)} if the notificationReceiptDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the notificationReceiptDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<NotificationReceiptDTO> partialUpdateNotificationReceipt(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody NotificationReceiptDTO notificationReceiptDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update NotificationReceipt partially : {}, {}", id, notificationReceiptDTO);
        if (notificationReceiptDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, notificationReceiptDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!notificationReceiptRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<NotificationReceiptDTO> result = notificationReceiptService.partialUpdate(notificationReceiptDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, notificationReceiptDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /notification-receipts} : get all the notificationReceipts.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of notificationReceipts in body.
     */
    @GetMapping("")
    public ResponseEntity<List<NotificationReceiptDTO>> getAllNotificationReceipts(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of NotificationReceipts");
        Page<NotificationReceiptDTO> page = notificationReceiptService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /notification-receipts/:id} : get the "id" notificationReceipt.
     *
     * @param id the id of the notificationReceiptDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the notificationReceiptDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<NotificationReceiptDTO> getNotificationReceipt(@PathVariable("id") Long id) {
        LOG.debug("REST request to get NotificationReceipt : {}", id);
        Optional<NotificationReceiptDTO> notificationReceiptDTO = notificationReceiptService.findOne(id);
        return ResponseUtil.wrapOrNotFound(notificationReceiptDTO);
    }

    /**
     * {@code DELETE  /notification-receipts/:id} : delete the "id" notificationReceipt.
     *
     * @param id the id of the notificationReceiptDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotificationReceipt(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete NotificationReceipt : {}", id);
        notificationReceiptService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
