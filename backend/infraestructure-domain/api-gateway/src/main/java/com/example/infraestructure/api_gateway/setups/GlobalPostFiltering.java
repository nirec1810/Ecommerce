package com.example.infraestructure.api_gateway.setups;

import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import reactor.core.publisher.Mono;

@Component
public class GlobalPostFiltering implements GlobalFilter, Ordered {

    private static final org.slf4j.Logger log =
            org.slf4j.LoggerFactory.getLogger(GlobalPostFiltering.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        return chain.filter(exchange).then(
                Mono.fromRunnable(() -> {
                    log.info("<<<< [POST FILTER - 3] Respuesta saliente. Status: {}",
                            exchange.getResponse().getStatusCode());
                })
        );
    }

    @Override
    public int getOrder() {
        return 10; 
    }
}