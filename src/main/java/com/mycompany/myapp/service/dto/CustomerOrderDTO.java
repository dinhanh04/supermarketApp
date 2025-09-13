package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.enumeration.OrderStatus;
import com.mycompany.myapp.domain.enumeration.PaymentMethod;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.CustomerOrder} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CustomerOrderDTO implements Serializable {

    private Long id;

    private String code;

    private Instant orderDate;

    private OrderStatus status;

    @DecimalMin(value = "0")
    private BigDecimal totalAmount;

    private PaymentMethod paymentMethod;

    private String shippingAddress;

    private String note;

    private CustomerDTO customer;

    private EmployeeDTO salesBy;

    @NotNull
    private StoreDTO store;

    private List<OrderItemDTO> orderItemDTOS;

    public List<OrderItemDTO> getOrderItemDTOS() {
        return orderItemDTOS;
    }

    public void setOrderItemDTOS(List<OrderItemDTO> orderItemDTOS) {
        this.orderItemDTOS = orderItemDTOS;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Instant getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Instant orderDate) {
        this.orderDate = orderDate;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    public EmployeeDTO getSalesBy() {
        return salesBy;
    }

    public void setSalesBy(EmployeeDTO salesBy) {
        this.salesBy = salesBy;
    }

    public StoreDTO getStore() {
        return store;
    }

    public void setStore(StoreDTO store) {
        this.store = store;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CustomerOrderDTO)) {
            return false;
        }

        CustomerOrderDTO customerOrderDTO = (CustomerOrderDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, customerOrderDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CustomerOrderDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", orderDate='" + getOrderDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", totalAmount=" + getTotalAmount() +
            ", paymentMethod='" + getPaymentMethod() + "'" +
            ", shippingAddress='" + getShippingAddress() + "'" +
            ", note='" + getNote() + "'" +
            ", customer=" + getCustomer() +
            ", salesBy=" + getSalesBy() +
            ", store=" + getStore() +
            "}";
    }
}
