package com.jesperdj.jaxb.domain;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
@XmlEnum(Integer.class) // By default Java enum maps to the schema enum of type string if we need to enforce another type, we can use @XmlEnum annotation
public enum Loyalty {
    @XmlEnumValue("10") BRONZE,
    @XmlEnumValue("20") SILVER,
    @XmlEnumValue("30") GOLD
}
