package org.example.beanutils;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

/**
 * Testing JavaDoc
 */
@Data
public class Course {

    int id;
    String title;

    Map<String, Student> students = new HashMap<>();
}
