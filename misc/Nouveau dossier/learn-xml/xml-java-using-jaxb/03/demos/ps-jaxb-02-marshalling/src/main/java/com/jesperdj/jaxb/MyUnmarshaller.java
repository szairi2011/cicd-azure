package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.PurchaseOrder;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

public class MyUnmarshaller {

    public static void main(String[] args) throws JAXBException {

        JAXBContext context = JAXBContext.newInstance(PurchaseOrder.class);

        Unmarshaller marshaller = context.createUnmarshaller();
    }
}
