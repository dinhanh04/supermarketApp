package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Store;
import com.mycompany.myapp.repository.StoreRepository;
import com.mycompany.myapp.service.StoreService;
import com.mycompany.myapp.service.dto.StoreDTO;
import com.mycompany.myapp.service.mapper.StoreMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Store}.
 */
@Service
@Transactional
public class StoreServiceImpl implements StoreService {

    private static final Logger LOG = LoggerFactory.getLogger(StoreServiceImpl.class);

    private final StoreRepository storeRepository;

    private final StoreMapper storeMapper;

    public StoreServiceImpl(StoreRepository storeRepository, StoreMapper storeMapper) {
        this.storeRepository = storeRepository;
        this.storeMapper = storeMapper;
    }

    @Override
    public StoreDTO save(StoreDTO storeDTO) {
        LOG.debug("Request to save Store : {}", storeDTO);
        Store store = storeMapper.toEntity(storeDTO);
        store = storeRepository.save(store);
        return storeMapper.toDto(store);
    }

    @Override
    public StoreDTO update(StoreDTO storeDTO) {
        LOG.debug("Request to update Store : {}", storeDTO);
        Store store = storeMapper.toEntity(storeDTO);
        store = storeRepository.save(store);
        return storeMapper.toDto(store);
    }

    @Override
    public Optional<StoreDTO> partialUpdate(StoreDTO storeDTO) {
        LOG.debug("Request to partially update Store : {}", storeDTO);

        return storeRepository
            .findById(storeDTO.getId())
            .map(existingStore -> {
                storeMapper.partialUpdate(existingStore, storeDTO);

                return existingStore;
            })
            .map(storeRepository::save)
            .map(storeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StoreDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Stores");
        return storeRepository.findAll(pageable).map(storeMapper::toDto);
    }

    public Page<StoreDTO> findAllWithEagerRelationships(Pageable pageable) {
        return storeRepository.findAllWithEagerRelationships(pageable).map(storeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StoreDTO> findOne(Long id) {
        LOG.debug("Request to get Store : {}", id);
        return storeRepository.findOneWithEagerRelationships(id).map(storeMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Store : {}", id);
        storeRepository.deleteById(id);
    }
}
