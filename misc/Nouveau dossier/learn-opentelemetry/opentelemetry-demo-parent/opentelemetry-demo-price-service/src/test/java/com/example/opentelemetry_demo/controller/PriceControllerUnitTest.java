package com.example.opentelemetry_demo.controller;

import com.example.opentelemetry_demo.exception.PriceNotFoundException;
import com.example.opentelemetry_demo.model.Price;
import com.example.opentelemetry_demo.repository.PriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PriceControllerUnitTest {

    @MockBean
    private PriceRepository priceRepository;

    @Autowired
    private MockMvc mockMvc;

    void when_product_is_available_then_return_price() throws Exception {

        // Arrange
        Price price = new Price();
        long productId = 100000L;
        price.setProductId(productId);
        price.setPrice(100.00);
        price.setDiscount(10.00);

        // Act
        when(priceRepository.getPrice(productId)).thenReturn(price);

        // Assert
        mockMvc.perform(get("/prices/" + productId))
                .andExpect(status().is(HttpStatus.OK.value()));
    }

    void when_product_is_not_available_then_return_not_found() throws Exception {
        // Arrange
        long productId = 100000L;

        // Act
        when(priceRepository.getPrice(productId)).thenThrow(PriceNotFoundException.class);

        // Assert
        mockMvc.perform(get("/prices/" + productId))
               .andExpect(status().is(HttpStatus.NOT_FOUND.value()));
    }
}
