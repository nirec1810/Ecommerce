package com.ads.product_service.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
private String name;
private BigDecimal price;
private Integer stock;
private Long categoryId;
}