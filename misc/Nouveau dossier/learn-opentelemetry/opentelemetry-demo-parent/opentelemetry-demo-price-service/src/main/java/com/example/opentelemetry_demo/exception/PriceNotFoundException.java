package com.example.opentelemetry_demo.exception;

public class PriceNotFoundException extends RuntimeException { // Throwing a RuntimeException in purpose here to help for the Jaeger traceability demo later
    public PriceNotFoundException(String message) {
        super(message);
    }
}
