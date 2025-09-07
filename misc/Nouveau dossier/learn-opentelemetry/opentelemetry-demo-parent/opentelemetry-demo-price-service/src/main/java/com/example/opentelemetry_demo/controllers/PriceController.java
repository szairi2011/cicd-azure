package com.example.opentelemetry_demo.controllers;

import com.example.opentelemetry_demo.model.Price;
import com.example.opentelemetry_demo.repository.PriceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "/price")
public class PriceController {
    private static final Logger LOGGER = LoggerFactory.getLogger(PriceController.class);
    @Autowired
    private PriceRepository priceRepository;
    @GetMapping(path = "{id}")
    public Price getPrice(@PathVariable long productId) {
        LOGGER.info("Get price for product id {}", productId);
        return priceRepository.getPrice(productId);
    }
}
