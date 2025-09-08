package org.example.convertergenerator;

import org.example.bancombiner.Person;
import org.example.beanutils.Course;

public class DtoMapper {
    private static CourseDto convertAs(Course from) {
        CourseDto to = new CourseDto();
        to.setId(from.getId());
        to.setTitle(from.getTitle());
        to.setStudents(from.getStudents());

        // Not mapped TO fields:
        // name
        // surname
        // age
        // role
        return to;
    }

    private static CourseDto convertAs(Person from, CourseDto to) {
//        CourseDto to = new CourseDto();
        to.setName(from.getName());
        to.setSurname(from.getSurname());
        to.setAge(from.getAge());
        to.setRole(from.getRole());

        // Not mapped TO fields:
        // id
        // title
        // students
        return to;
    }

    public static CourseDto map(Course course, Person person) {
        CourseDto dto = convertAs(course);
        dto = convertAs(person, dto);
        return dto;
    }
}
