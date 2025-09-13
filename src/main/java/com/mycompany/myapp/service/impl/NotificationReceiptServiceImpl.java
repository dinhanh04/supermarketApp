package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.NotificationReceipt;
import com.mycompany.myapp.repository.NotificationReceiptRepository;
import com.mycompany.myapp.service.NotificationReceiptService;
import com.mycompany.myapp.service.dto.NotificationReceiptDTO;
import com.mycompany.myapp.service.mapper.NotificationReceiptMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.NotificationReceipt}.
 */
@Service
@Transactional
public class NotificationReceiptServiceImpl implements NotificationReceiptService {

    private static final Logger LOG = LoggerFactory.getLogger(NotificationReceiptServiceImpl.class);

    private final NotificationReceiptRepository notificationReceiptRepository;

    private final NotificationReceiptMapper notificationReceiptMapper;

    public NotificationReceiptServiceImpl(
        NotificationReceiptRepository notificationReceiptRepository,
        NotificationReceiptMapper notificationReceiptMapper
    ) {
        this.notificationReceiptRepository = notificationReceiptRepository;
        this.notificationReceiptMapper = notificationReceiptMapper;
    }

    @Override
    public NotificationReceiptDTO save(NotificationReceiptDTO notificationReceiptDTO) {
        LOG.debug("Request to save NotificationReceipt : {}", notificationReceiptDTO);
        NotificationReceipt notificationReceipt = notificationReceiptMapper.toEntity(notificationReceiptDTO);
        notificationReceipt = notificationReceiptRepository.save(notificationReceipt);
        return notificationReceiptMapper.toDto(notificationReceipt);
    }

    @Override
    public NotificationReceiptDTO update(NotificationReceiptDTO notificationReceiptDTO) {
        LOG.debug("Request to update NotificationReceipt : {}", notificationReceiptDTO);
        NotificationReceipt notificationReceipt = notificationReceiptMapper.toEntity(notificationReceiptDTO);
        notificationReceipt = notificationReceiptRepository.save(notificationReceipt);
        return notificationReceiptMapper.toDto(notificationReceipt);
    }

    @Override
    public Optional<NotificationReceiptDTO> partialUpdate(NotificationReceiptDTO notificationReceiptDTO) {
        LOG.debug("Request to partially update NotificationReceipt : {}", notificationReceiptDTO);

        return notificationReceiptRepository
            .findById(notificationReceiptDTO.getId())
            .map(existingNotificationReceipt -> {
                notificationReceiptMapper.partialUpdate(existingNotificationReceipt, notificationReceiptDTO);

                return existingNotificationReceipt;
            })
            .map(notificationReceiptRepository::save)
            .map(notificationReceiptMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NotificationReceiptDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all NotificationReceipts");
        return notificationReceiptRepository.findAll(pageable).map(notificationReceiptMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<NotificationReceiptDTO> findOne(Long id) {
        LOG.debug("Request to get NotificationReceipt : {}", id);
        return notificationReceiptRepository.findById(id).map(notificationReceiptMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete NotificationReceipt : {}", id);
        notificationReceiptRepository.deleteById(id);
    }
}
