package org.example.convertergenerator;
import lombok.Data;
import org.example.bancombiner.Person;
import org.example.beanutils.Course;
import org.example.beanutils.Student;

import java.util.HashMap;
import java.util.Map;

/**
 * Testing JavaDoc
 */
@Data
public class CourseDto {
    private int id;
    private String title;
    private Map<String, Student> students;
    private String name;
    private String surname;
    private String age;
    private String role;

}
