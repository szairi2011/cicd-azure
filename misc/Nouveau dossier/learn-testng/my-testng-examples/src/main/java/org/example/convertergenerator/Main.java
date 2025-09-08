package org.example.convertergenerator;

import org.example.bancombiner.Person;
import org.example.beanutils.Course;

public class Main {
    public static void main(String[] args) {
        Course course = new Course();
        course.setId(123);
        course.setTitle("Networking ...");

        Person person = Person.builder()
                .name("Adam")
                .role("student")
                .surname("Zairi")
                .age("12")
                .build();

        CourseDto courseDto = DtoMapper.map(course, person);

        System.out.println(courseDto);
    }
}
