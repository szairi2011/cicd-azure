package org.example.bancombiner;

import lombok.ToString;
import lombok.experimental.Delegate;
//@Builder
@ToString
public class Employee {

    @Delegate(types = {User.class})
    User user = new User();

    @Delegate(types = {Person.class}, excludes = {})
    Person person;

}
