package com.ads.order_service.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders") // 'order' es palabra reservada
public class Order {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long orderId;


private Long customerId;


private LocalDateTime orderDate;


private BigDecimal totalAmount;


@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "order")
private List<OrderLine> lines = new ArrayList<>();
}