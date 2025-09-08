package com.testables;

import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import static org.testng.Assert.*;

public class AdderTest {

    Adder adder = null;

    @BeforeMethod
    public void setUp() {
        this.adder = new Adder();
    }

    @AfterMethod
    public void tearDown() {
    }

    @Test
    public void testSum() {
        assert (this.adder.sum(3, 2) == 5 );
    }

    @Test
    public void testSubtract() {
        assert (this.adder.subtract(3, 2) == 1 );
    }
}