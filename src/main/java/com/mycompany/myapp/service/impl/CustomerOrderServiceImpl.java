package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.CustomerOrder;
import com.mycompany.myapp.repository.CustomerOrderRepository;
import com.mycompany.myapp.service.CustomerOrderService;
import com.mycompany.myapp.service.OrderItemService;
import com.mycompany.myapp.service.dto.CustomerOrderDTO;
import com.mycompany.myapp.service.dto.OrderItemDTO;
import com.mycompany.myapp.service.dto.ProductDTO;
import com.mycompany.myapp.service.mapper.CustomerOrderMapper;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.CustomerOrder}.
 */
@Service
@Transactional
public class CustomerOrderServiceImpl implements CustomerOrderService {

    private static final Logger LOG = LoggerFactory.getLogger(CustomerOrderServiceImpl.class);

    private final CustomerOrderRepository customerOrderRepository;

    private final CustomerOrderMapper customerOrderMapper;
    private final OrderItemService orderItemService;

    public CustomerOrderServiceImpl(
        CustomerOrderRepository customerOrderRepository,
        CustomerOrderMapper customerOrderMapper,
        OrderItemService orderItemService
    ) {
        this.customerOrderRepository = customerOrderRepository;
        this.customerOrderMapper = customerOrderMapper;
        this.orderItemService = orderItemService;
    }

    @Override
    public CustomerOrderDTO save(CustomerOrderDTO customerOrderDTO) {
        LOG.debug("Request to save CustomerOrder : {}", customerOrderDTO);
        CustomerOrder customerOrder = customerOrderMapper.toEntity(customerOrderDTO);
        customerOrder = customerOrderRepository.save(customerOrder);
        return customerOrderMapper.toDto(customerOrder);
    }

    @Override
    public CustomerOrderDTO update(CustomerOrderDTO customerOrderDTO) {
        LOG.debug("Request to update CustomerOrder : {}", customerOrderDTO);
        CustomerOrder customerOrder = customerOrderMapper.toEntity(customerOrderDTO);
        customerOrder = customerOrderRepository.save(customerOrder);
        return customerOrderMapper.toDto(customerOrder);
    }

    @Override
    public Optional<CustomerOrderDTO> partialUpdate(CustomerOrderDTO customerOrderDTO) {
        LOG.debug("Request to partially update CustomerOrder : {}", customerOrderDTO);

        return customerOrderRepository
            .findById(customerOrderDTO.getId())
            .map(existingCustomerOrder -> {
                customerOrderMapper.partialUpdate(existingCustomerOrder, customerOrderDTO);

                return existingCustomerOrder;
            })
            .map(customerOrderRepository::save)
            .map(customerOrderMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CustomerOrderDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all CustomerOrders");
        return customerOrderRepository.findAll(pageable).map(customerOrderMapper::toDto);
    }

    public Page<CustomerOrderDTO> findAllWithEagerRelationships(Pageable pageable) {
        return customerOrderRepository.findAllWithEagerRelationships(pageable).map(customerOrderMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CustomerOrderDTO> findOne(Long id) {
        LOG.debug("Request to get CustomerOrder : {}", id);
        return customerOrderRepository.findOneWithEagerRelationships(id).map(customerOrderMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete CustomerOrder : {}", id);
        customerOrderRepository.deleteById(id);
    }

    @Override
    public CustomerOrderDTO createOrder(CustomerOrderDTO customerOrder) {
        List<OrderItemDTO> items = customerOrder.getOrderItemDTOS();

        customerOrder = this.save(customerOrder);

        BigDecimal totalPrice = BigDecimal.ZERO;
        for (OrderItemDTO item : items) {
            item.setUnitPrice(item.getProduct().getPrice());
            BigDecimal lineTotal = item.getProduct().getPrice().multiply(new BigDecimal(item.getQuantity()));
            BigDecimal discount = item.getDiscount().multiply(lineTotal);
            lineTotal = lineTotal.subtract(discount).setScale(2, RoundingMode.DOWN);
            item.setLineTotal(lineTotal);
            item.setOrder(customerOrder);
            totalPrice = totalPrice.add(lineTotal);
            orderItemService.save(item);
        }
        customerOrder.setTotalAmount(totalPrice);

        customerOrder = this.save(customerOrder);

        customerOrder.setOrderItemDTOS(items);

        return customerOrder;
    }
}
