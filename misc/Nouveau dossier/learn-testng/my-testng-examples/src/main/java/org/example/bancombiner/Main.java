package org.example.bancombiner;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Main {
    public static void main(String[] args) {
        // Used BeanCombiner IntelliJ plugin
        Customer customer =
                Customer.builder()
                        .userID(123456L)
                        .name("Sou")
                        .surname("Lou")
                        .username("soulou")
                        .password("123")
                        .build();

        System.out.println(customer);

        // Used Lombok composition
        Employee employee = new Employee();
        employee.person = Person.builder()
                .age("45")
                .role("SM")
                .build();

        log.info(employee.toString());

    }
}
