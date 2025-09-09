package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Customer;
import com.mycompany.myapp.domain.Notification;
import com.mycompany.myapp.domain.NotificationReceipt;
import com.mycompany.myapp.service.dto.CustomerDTO;
import com.mycompany.myapp.service.dto.NotificationDTO;
import com.mycompany.myapp.service.dto.NotificationReceiptDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link NotificationReceipt} and its DTO {@link NotificationReceiptDTO}.
 */
@Mapper(componentModel = "spring")
public interface NotificationReceiptMapper extends EntityMapper<NotificationReceiptDTO, NotificationReceipt> {
    @Mapping(target = "notification", source = "notification", qualifiedByName = "notificationId")
    @Mapping(target = "customer", source = "customer", qualifiedByName = "customerId")
    NotificationReceiptDTO toDto(NotificationReceipt s);

    @Named("notificationId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    NotificationDTO toDtoNotificationId(Notification notification);

    @Named("customerId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CustomerDTO toDtoCustomerId(Customer customer);
}
