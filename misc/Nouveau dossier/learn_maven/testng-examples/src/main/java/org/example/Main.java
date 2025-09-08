package org.example;

import com.testables.Adder;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
        Adder adder = new Adder();
        int sum = adder.sum(4, 5);
        System.out.println("Sum of 4 and 5 is: " + sum);
    }
}