package com.ads.order_service.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ads.order_service.dto.OrderRequest;
import com.ads.order_service.dto.OrderResponse;
import com.ads.order_service.exception.CustomerNotFoundException;
import com.ads.order_service.exception.InsufficientStockException;
import com.ads.order_service.model.Order;
import com.ads.order_service.model.OrderLine;
import com.ads.order_service.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderResponse createOrder(OrderRequest req) {
        // Validaciones simuladas
        validateCustomer(req.getCustomerId());
        for (OrderRequest.OrderLineRequest l : req.getLines()) {
            validateProductStock(l.getProductId(), l.getQuantity());
        }

        Order order = new Order();
        order.setCustomerId(req.getCustomerId());
        order.setOrderDate(LocalDateTime.now());

        BigDecimal total = BigDecimal.ZERO;
        for (OrderRequest.OrderLineRequest l : req.getLines()) {
            OrderLine ol = new OrderLine();
            ol.setProductId(l.getProductId());
            ol.setQuantity(l.getQuantity());
            ol.setPriceAtTimeOfOrder(l.getPrice());
            ol.setOrder(order);
            order.getLines().add(ol);
            total = total.add(l.getPrice().multiply(BigDecimal.valueOf(l.getQuantity())));
        }
        order.setTotalAmount(total);

        Order saved = orderRepository.save(order);

        return new OrderResponse(
                saved.getOrderId(),
                saved.getCustomerId(),
                saved.getOrderDate(),
                saved.getTotalAmount(),
                saved.getLines().stream()
                        .map(ol -> new OrderResponse.OrderLineDto(ol.getProductId(), ol.getQuantity(), ol.getPriceAtTimeOfOrder()))
                        .collect(Collectors.toList())
        );
    }

    private void validateCustomer(Long customerId) {
        if (customerId == null || customerId == 0L) {
            throw new CustomerNotFoundException(customerId);
        }
    }

    private void validateProductStock(Long productId, Integer quantity) {
        if (quantity != null && quantity > 5) {
            throw new InsufficientStockException(productId);
        }
    }
}