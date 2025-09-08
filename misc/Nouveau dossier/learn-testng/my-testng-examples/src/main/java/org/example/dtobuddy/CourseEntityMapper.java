package org.example.dtobuddy;

import org.example.beanutils.CourseEntity;

public class CourseEntityMapper {
    public static CourseEntityDto mapperToDto(CourseEntity courseEntity) {
        CourseEntityDto courseEntityDto = new CourseEntityDto();
        courseEntityDto.setId(courseEntity.getId());
        courseEntityDto.setTitle(courseEntity.getTitle());
        courseEntityDto.setStudents(courseEntity.getStudents());
        return courseEntityDto;
    }
}
