package com.ads.ecommerce.infraestructure.keycloakAdapter.models;

import lombok.Data;

@Data
public class LoginResponse {
    
    private String token;
    private UserSessionInfo user;

}
