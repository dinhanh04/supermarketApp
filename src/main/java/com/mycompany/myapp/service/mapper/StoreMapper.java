package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Store;
import com.mycompany.myapp.domain.Supplier;
import com.mycompany.myapp.service.dto.StoreDTO;
import com.mycompany.myapp.service.dto.SupplierDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Store} and its DTO {@link StoreDTO}.
 */
@Mapper(componentModel = "spring")
public interface StoreMapper extends EntityMapper<StoreDTO, Store> {
    @Mapping(target = "suppliers", source = "suppliers", qualifiedByName = "supplierIdSet")
    StoreDTO toDto(Store s);

    @Mapping(target = "removeSuppliers", ignore = true)
    Store toEntity(StoreDTO storeDTO);

    @Named("supplierId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SupplierDTO toDtoSupplierId(Supplier supplier);

    @Named("supplierIdSet")
    default Set<SupplierDTO> toDtoSupplierIdSet(Set<Supplier> supplier) {
        return supplier.stream().map(this::toDtoSupplierId).collect(Collectors.toSet());
    }
}
