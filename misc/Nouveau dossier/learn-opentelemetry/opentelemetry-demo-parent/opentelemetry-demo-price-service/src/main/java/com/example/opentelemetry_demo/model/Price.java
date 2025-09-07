package com.example.opentelemetry_demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Price {

    @JsonProperty("productId")
    private long productId;

    @JsonProperty("price")
    private double price;

    @JsonProperty("discount")
    private double discount;
}
