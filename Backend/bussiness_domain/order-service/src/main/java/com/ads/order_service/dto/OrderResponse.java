package com.ads.order_service.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long orderId;
    private Long customerId;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private List<OrderLineDto> lines;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderLineDto {
        private Long productId;
        private Integer quantity;
        private BigDecimal price;
    }
}