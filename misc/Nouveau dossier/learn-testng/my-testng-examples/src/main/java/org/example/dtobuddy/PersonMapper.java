package org.example.dtobuddy;

import org.example.bancombiner.Person;

public class PersonMapper {
    public static PersonDto mapperToDto(Person person) {
        PersonDto personDto = new PersonDto();
        personDto.setName(person.getName());
        personDto.setSurname(person.getSurname());
        personDto.setAge(person.getAge());
        personDto.setRole(person.getRole());
        return personDto;
    }
}
