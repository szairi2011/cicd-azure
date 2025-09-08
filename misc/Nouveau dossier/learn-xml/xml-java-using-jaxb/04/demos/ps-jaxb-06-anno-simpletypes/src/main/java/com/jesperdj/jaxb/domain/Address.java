package com.jesperdj.jaxb.domain;

import javax.xml.bind.annotation.XmlType;

@XmlType(propOrder = {"street", "city", "postalCode", "country"})
public class Address {
    private String street;
    private String city;
    private String postalCode;
    private Country country;

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}
