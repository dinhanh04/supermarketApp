package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Store;
import com.mycompany.myapp.domain.Supplier;
import com.mycompany.myapp.service.dto.StoreDTO;
import com.mycompany.myapp.service.dto.SupplierDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Supplier} and its DTO {@link SupplierDTO}.
 */
@Mapper(componentModel = "spring")
public interface SupplierMapper extends EntityMapper<SupplierDTO, Supplier> {
    @Mapping(target = "stores", source = "stores", qualifiedByName = "storeIdSet")
    SupplierDTO toDto(Supplier s);

    @Mapping(target = "stores", ignore = true)
    @Mapping(target = "removeStores", ignore = true)
    Supplier toEntity(SupplierDTO supplierDTO);

    @Named("storeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StoreDTO toDtoStoreId(Store store);

    @Named("storeIdSet")
    default Set<StoreDTO> toDtoStoreIdSet(Set<Store> store) {
        return store.stream().map(this::toDtoStoreId).collect(Collectors.toSet());
    }
}
