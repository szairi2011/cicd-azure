package org.example.dtobuddy;

import org.example.beanutils.Course;

public class CourseMapper {
    public static CourseDto mapperToDto(Course course) {
        CourseDto courseDto = new CourseDto();
        courseDto.setId(course.getId());
        courseDto.setTitle(course.getTitle());
        courseDto.setStudents(course.getStudents());
        return courseDto;
    }
}
