package org.example.lombok;

public class APIConfigurationMain {

    public static void main(String[] args) {
        APIConfiguration config =
                APIConfiguration.builder()
                        .host("host")
                        .port(8080)
                        .connectTimeout(10000)
                        .build();

        System.out.println(config);
    }
}
