package com.jesperdj.jaxb.domain;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;

/**
 * <xs:simpleType name="Loyalty">
 *     <xs:restriction base="xs:int">
 *         <xs:enumeration value="10"/>
 *         <xs:enumeration value="20"/>
 *         <xs:enumeration value="30"/>
 *     </xs:restriction>
 * </xs:simpleType>
 */
@XmlEnum(Integer.class)
public enum Loyalty {
    @XmlEnumValue("10") BRONZE,
    @XmlEnumValue("20") SILVER,
    @XmlEnumValue("30") GOLD
}
