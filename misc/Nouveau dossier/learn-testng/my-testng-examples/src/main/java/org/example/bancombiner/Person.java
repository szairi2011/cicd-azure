package org.example.bancombiner;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;
@Data
@Builder
public class Person {
    String name;
    String surname;
    String age;
    String role;
}
