package com.example.infraestructure.api_gateway.setups;

import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import reactor.core.publisher.Mono;

@Component
public class AuthenticationFiltering implements GlobalFilter, Ordered {

    private static final org.slf4j.Logger log =
            org.slf4j.LoggerFactory.getLogger(AuthenticationFiltering.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        log.info(">>>> [AUTH FILTER - 2] Petición pasó por autenticación/autorización.");

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -5; 
    }
}