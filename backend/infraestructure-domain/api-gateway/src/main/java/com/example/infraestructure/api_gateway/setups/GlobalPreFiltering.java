package com.example.infraestructure.api_gateway.setups;

import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import reactor.core.publisher.Mono;

@Component
public class GlobalPreFiltering implements GlobalFilter, Ordered {

    private static final org.slf4j.Logger log =
            org.slf4j.LoggerFactory.getLogger(GlobalPreFiltering.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        log.info(">>>> [PRE FILTER - 1] Petición recibida. URI: {}",
                exchange.getRequest().getURI());

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -10; 
    }
}
