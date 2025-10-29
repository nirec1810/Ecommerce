package com.ads.product_service.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


private String name;


private BigDecimal price;


private Integer stock;


@ManyToOne
@JoinColumn(name = "category_id")
private ProductCategory category;
}