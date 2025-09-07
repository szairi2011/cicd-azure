package com.example.opentelemetry_demo.repository;

import com.example.opentelemetry_demo.exception.PriceNotFoundException;
import com.example.opentelemetry_demo.model.Price;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
@Component
public class PriceRepository {
    private static final Logger LOGGER = LoggerFactory.getLogger(PriceRepository.class);

    private Map<Long, Price> priceMap = new HashMap<>();
    public Price getPrice(long productId) {

        LOGGER.info("Getting price from Price Repository for product id {}", productId);

        if (!priceMap.containsKey(productId)) {
            LOGGER.error("Price not found for productId {}", productId);
            throw new PriceNotFoundException("Not not found for productID: " + productId);
        }

        return priceMap.get(productId);
    }

    @PostConstruct
    public void setupRepository() {
        Price price1 = addPrice(1001L, 125.2, 2.1);
        priceMap.put(1001L, price1);

        Price price2 = addPrice(1002L, 12.6, 1.1);
        priceMap.put(1002L, price2);

        Price price3 = addPrice(1003L, 784.3, 10.5);
        priceMap.put(1003L, price3);

        Price price4 = addPrice(1004L, 135.8, 20.1);
        priceMap.put(1004L, price4);

        Price price5 = addPrice(1005L, 251.4, 1.7);
    }

    private Price addPrice(long productId, double price, double discount) {
        Price priceObj = new Price();
        priceObj.setProductId(productId);
        priceObj.setPrice(price);
        priceObj.setDiscount(discount);
        return priceObj;
    }
}
