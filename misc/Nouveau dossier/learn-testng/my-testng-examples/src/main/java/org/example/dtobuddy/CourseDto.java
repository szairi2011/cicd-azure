package org.example.dtobuddy;

import lombok.Data;
import org.example.beanutils.Student;

import java.util.HashMap;
import java.util.Map;

@Data
public class CourseDto {
    int id;
    String title;
    Map<String, Student> students = new HashMap<>();
}
