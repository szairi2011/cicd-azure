package org.example.bancombiner;

import lombok.Builder;
import lombok.Data;
import lombok.Value;

@Data
@Builder
//@Value
public class Customer {
    private String name;
    private String surname;
    private String age;
    private String role;
    private String username;
    private String password;
    private Long userID;
}
