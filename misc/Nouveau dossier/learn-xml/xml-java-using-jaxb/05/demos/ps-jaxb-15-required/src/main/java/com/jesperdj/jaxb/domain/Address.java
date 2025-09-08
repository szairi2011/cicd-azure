package com.jesperdj.jaxb.domain;

import javax.xml.bind.annotation.XmlElement;

public class Address {
    @XmlElement(required = true)
    private String street;

    @XmlElement(required = true)
    private String city;

    @XmlElement(required = true)
    private String postalCode;

    @XmlElement(required = true)
    private String country;

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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
