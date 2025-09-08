package org.example.lombok;

import lombok.extern.slf4j.Slf4j;

import java.util.HashSet;
import java.util.Set;

// A tuto to set up SLFJ with log4j2 for Maven -- https://www.baeldung.com/slf4j-with-log4j2-logback
// An another tuto to set up appenders -- https://www.baeldung.com/java-log4j2-file-and-console
@Slf4j
public class LoginResultMain {
    public static void main(String[] args) {
        LoginResult result = new LoginResult();

        result.userName("sou").password("123");

        System.out.println(result);
        System.out.println(result.userName());

        LoginResult result2 = new LoginResult();
        result2.userName("sou").password("123");

        Set<LoginResult> results = new HashSet<>();
        results.add(result);
//        results.add(result2);

        System.out.println("Both results are equal: " + result.equals(result2));
        System.out.println("Hashset contains object: " + results.contains(result2));

        results.add(result2);

        log.info("Hashset number of items: " + results.size());


    }
}
