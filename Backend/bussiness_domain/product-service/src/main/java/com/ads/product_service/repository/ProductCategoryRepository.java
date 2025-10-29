package com.ads.product_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ads.product_service.model.ProductCategory;


public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}