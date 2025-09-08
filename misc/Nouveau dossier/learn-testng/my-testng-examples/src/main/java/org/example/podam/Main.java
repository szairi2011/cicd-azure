package org.example.podam;

import uk.co.jemos.podam.api.PodamFactory;
import uk.co.jemos.podam.api.PodamFactoryImpl;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // Simplest scenario. Will delegate to Podam all decisions
        PodamFactory factory = new PodamFactoryImpl();

        // This will use constructor with maximum arguments and
        // then setters to populate POJO
        Person person = factory.manufacturePojoWithFullData(Person.class);

        System.out.println(person);

        List<Person> persons = factory.manufacturePojo(ArrayList.class, Person.class);
        persons.forEach(p -> System.out.println(p));
    }
}
