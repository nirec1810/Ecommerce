package com.ads.customer.repository;

import java.util.List;
import java.util.Optional;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import com.ads.customer.model.Customer;
import com.ads.customer.model.CustomerType;
 
 
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
   
    Optional<Customer> findByEmail(String email);
   
    Optional<Customer> findByCustomerCode(String customerCode);
   
    List<Customer> findByActive(Boolean active);
   
    List<Customer> findByCustomerType(CustomerType type);
   
    boolean existsByEmail(String email);
   
    boolean existsByTaxId(String taxId);
 
}
 
