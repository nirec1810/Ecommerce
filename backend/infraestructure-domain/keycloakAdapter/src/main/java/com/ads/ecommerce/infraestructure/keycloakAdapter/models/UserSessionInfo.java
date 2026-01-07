package com.ads.ecommerce.infraestructure.keycloakAdapter.models;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class UserSessionInfo {
    private String username;
    private String email;
    private Map<String, List<String>> rolesPorEmpresa; // clave = empresa (ej. empresa), valor = lista de roles
}
