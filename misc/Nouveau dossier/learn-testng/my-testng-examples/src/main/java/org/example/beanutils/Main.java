package org.example.beanutils;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;

import java.lang.reflect.InvocationTargetException;

// Tuto available under -- https://www.baeldung.com/apache-commons-beanutils

public class Main {
    public static void main(String[] args) throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {

        Student student = new Student();
        student.setName("student-1");

        Course course = new Course();
        course.setId(123);
        course.setTitle("Networking");
        PropertyUtils.setMappedProperty(course, "students(ST-1)", student); // Add a new student entry to he students map, where key = "ST-1"

        CourseEntity courseEntity = new CourseEntity();

        BeanUtils.copyProperties(courseEntity, course);

        System.out.println(courseEntity);
    }
}
