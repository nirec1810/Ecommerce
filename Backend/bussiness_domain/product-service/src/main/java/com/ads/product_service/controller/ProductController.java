package com.ads.product_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ads.product_service.dto.ProductRequest;
import com.ads.product_service.dto.ProductResponse;
import com.ads.product_service.exception.ProductNotFoundException;
import com.ads.product_service.service.ProductService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {


private final ProductService productService;


@PostMapping
public ResponseEntity<ProductResponse> create(@RequestBody ProductRequest req) {
ProductResponse resp = productService.createProduct(req);
return new ResponseEntity<>(resp, HttpStatus.CREATED);
}


@GetMapping("/{id}")
public ResponseEntity<ProductResponse> getById(@PathVariable Long id) {
ProductResponse resp = productService.getProductById(id);
return ResponseEntity.ok(resp);
}


@ExceptionHandler(ProductNotFoundException.class)
public ResponseEntity<String> handleNotFound(ProductNotFoundException ex) {
return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
}
}