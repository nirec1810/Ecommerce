package com.ads.order_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ads.order_service.dto.OrderRequest;
import com.ads.order_service.dto.OrderResponse;
import com.ads.order_service.exception.CustomerNotFoundException;
import com.ads.order_service.exception.InsufficientStockException;
import com.ads.order_service.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> create(@RequestBody OrderRequest req) {
        OrderResponse resp = orderService.createOrder(req);
        return new ResponseEntity<>(resp, HttpStatus.CREATED);
    }

    @ExceptionHandler({CustomerNotFoundException.class})
    public ResponseEntity<String> handleNotFound(CustomerNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler({InsufficientStockException.class})
    public ResponseEntity<String> handleBadRequest(InsufficientStockException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}

