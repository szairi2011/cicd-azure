package com.jesperdj.jaxb.domain;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;

@XmlRegistry
public class ObjectFactory {

    @XmlElementDecl(namespace = "http://www.jesperdj.com/ps-jaxb", name = "comment", scope = Item.class)
    public JAXBElement<String> createItemComment(String comment) {
        return new JAXBElement<>(new QName("http://www.jesperdj.com/ps-jaxb", "comment"), String.class, Item.class, comment);
    }
}
