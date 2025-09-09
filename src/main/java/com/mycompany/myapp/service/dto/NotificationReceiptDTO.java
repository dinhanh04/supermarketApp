package com.mycompany.myapp.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.NotificationReceipt} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NotificationReceiptDTO implements Serializable {

    private Long id;

    private Boolean isRead;

    private Instant deliveredAt;

    private Instant readAt;

    @NotNull
    private NotificationDTO notification;

    @NotNull
    private CustomerDTO customer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public Instant getDeliveredAt() {
        return deliveredAt;
    }

    public void setDeliveredAt(Instant deliveredAt) {
        this.deliveredAt = deliveredAt;
    }

    public Instant getReadAt() {
        return readAt;
    }

    public void setReadAt(Instant readAt) {
        this.readAt = readAt;
    }

    public NotificationDTO getNotification() {
        return notification;
    }

    public void setNotification(NotificationDTO notification) {
        this.notification = notification;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NotificationReceiptDTO)) {
            return false;
        }

        NotificationReceiptDTO notificationReceiptDTO = (NotificationReceiptDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, notificationReceiptDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NotificationReceiptDTO{" +
            "id=" + getId() +
            ", isRead='" + getIsRead() + "'" +
            ", deliveredAt='" + getDeliveredAt() + "'" +
            ", readAt='" + getReadAt() + "'" +
            ", notification=" + getNotification() +
            ", customer=" + getCustomer() +
            "}";
    }
}
