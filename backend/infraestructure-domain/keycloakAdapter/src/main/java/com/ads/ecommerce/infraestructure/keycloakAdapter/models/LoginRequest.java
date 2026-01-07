package com.ads.ecommerce.infraestructure.keycloakAdapter.models;
import lombok.Data;

@Data
public class LoginRequest {

    private String username;
    private String password;

}
