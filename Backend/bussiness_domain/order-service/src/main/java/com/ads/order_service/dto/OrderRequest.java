package com.ads.order_service.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private Long customerId;
    private List<OrderLineRequest> lines;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderLineRequest {
        private Long productId;
        private Integer quantity;
        private BigDecimal price;
    }
}