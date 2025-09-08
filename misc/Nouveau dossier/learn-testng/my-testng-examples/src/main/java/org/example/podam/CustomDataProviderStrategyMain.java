package org.example.podam;

import uk.co.jemos.podam.api.PodamFactory;
import uk.co.jemos.podam.api.PodamFactoryImpl;
import uk.co.jemos.podam.typeManufacturers.TypeManufacturer;

import java.util.ArrayList;
import java.util.List;

/**
 * More POjo Data Mocker (PODAM) examples are available under -- https://mtedone.github.io/podam/index.html
 */
public class CustomDataProviderStrategyMain {
    public static void main(String[] args) {
//        DataProviderStrategy strategy = new MyDataProviderStrategy(2);

        TypeManufacturer<?> customStringManufactorer = new MyStringManufacturer();
        PodamFactory factory = new PodamFactoryImpl();

        factory.setStrategy(new MyPodamDataProviderStrategy(3));

        // Replace the default collection number for the strategy
        factory.getStrategy().setDefaultNumberOfCollectionElements(2);
        MyEmailStrategy emailStrategy = new MyEmailStrategy();

        // Defining an attribute-level strategy with DataProviderStrategy
        factory.getStrategy().addOrReplaceTypeManufacturer(String.class, new MyStringManufacturer());

        // Defining an attribute-level strategy -- The same result can be also achieved using annotation inside the bean Person.class -- @PodamStrategyValue(value = MyEmailStrategy.class)
        factory.getStrategy().addOrReplaceAttributeStrategy(Person.class, "email", emailStrategy);

        List<Person> persons = factory.manufacturePojo(ArrayList.class, Person.class);
        persons.forEach(p -> System.out.println(p));

        // Checking whether PODAM re-initializes all values even when already set
//        factory.getClassStrategy().getExcludedFields(Person.class).add()

        Person person = new Person();
        person.setFirstname("Sou");
        person.setLastname("Lou");
        person.setEmail("email already set");
        person.setEmail2("email2 already set");
        factory.populatePojo(person);

        System.out.println(person);
    }
}
