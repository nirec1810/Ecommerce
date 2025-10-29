package com.ads.product_service.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ads.product_service.dto.ProductRequest;
import com.ads.product_service.dto.ProductResponse;
import com.ads.product_service.exception.ProductNotFoundException;
import com.ads.product_service.model.Product;
import com.ads.product_service.model.ProductCategory;
import com.ads.product_service.repository.ProductCategoryRepository;
import com.ads.product_service.repository.ProductRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class ProductService {


private final ProductRepository productRepository;
private final ProductCategoryRepository categoryRepository;


public ProductResponse createProduct(ProductRequest req) {
ProductCategory cat = null;
if (req.getCategoryId() != null) {
Optional<ProductCategory> opt = categoryRepository.findById(req.getCategoryId());
cat = opt.orElse(null);
}
Product p = new Product();
p.setName(req.getName());
p.setPrice(req.getPrice());
p.setStock(req.getStock());
p.setCategory(cat);
Product saved = productRepository.save(p);
return mapToResponse(saved);
}


public ProductResponse getProductById(Long id) {
Product p = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
return mapToResponse(p);
}


private ProductResponse mapToResponse(Product p) {
Long catId = p.getCategory() != null ? p.getCategory().getId() : null;
return new ProductResponse(p.getId(), p.getName(), p.getPrice(), p.getStock(), catId);
}
}