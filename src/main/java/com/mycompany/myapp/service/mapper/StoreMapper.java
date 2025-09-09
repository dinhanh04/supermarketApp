package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Store;
import com.mycompany.myapp.service.dto.StoreDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Store} and its DTO {@link StoreDTO}.
 */
@Mapper(componentModel = "spring")
public interface StoreMapper extends EntityMapper<StoreDTO, Store> {}
