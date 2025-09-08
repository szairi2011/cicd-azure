package org.example.beanutils;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;
@Data
public class CourseEntity {
    int id;
    String title;
    Map<String, Student> students = new HashMap<>();

}
