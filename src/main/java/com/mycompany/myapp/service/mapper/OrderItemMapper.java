package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.CustomerOrder;
import com.mycompany.myapp.domain.OrderItem;
import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.service.dto.CustomerOrderDTO;
import com.mycompany.myapp.service.dto.OrderItemDTO;
import com.mycompany.myapp.service.dto.ProductDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OrderItem} and its DTO {@link OrderItemDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderItemMapper extends EntityMapper<OrderItemDTO, OrderItem> {
    @Mapping(target = "product", source = "product", qualifiedByName = "productSku")
    @Mapping(target = "order", source = "order", qualifiedByName = "customerOrderId")
    OrderItemDTO toDto(OrderItem s);

    @Named("productSku")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "sku", source = "sku")
    ProductDTO toDtoProductSku(Product product);

    @Named("customerOrderId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CustomerOrderDTO toDtoCustomerOrderId(CustomerOrder customerOrder);
}
