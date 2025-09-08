package org.example.dtobuddy;

import org.example.beanutils.Student;

public class StudentMapper {
    public static StudentDto mapperToDto(Student student) {
        StudentDto studentDto = new StudentDto();
        studentDto.setName(student.getName());
        return studentDto;
    }
}
