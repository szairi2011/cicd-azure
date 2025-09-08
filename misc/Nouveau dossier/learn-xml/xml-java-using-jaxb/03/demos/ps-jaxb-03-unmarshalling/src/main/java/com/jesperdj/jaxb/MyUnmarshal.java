package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.PurchaseOrder;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;
import java.io.File;

public class MyUnmarshal {

    public static void main(String[] args) throws JAXBException {

        JAXBContext context = JAXBContext.newInstance(PurchaseOrder.class);

        Unmarshaller unmarshaller = context.createUnmarshaller();

        JAXBElement<PurchaseOrder> rootElement = unmarshaller.unmarshal(
                new StreamSource(new File("src/main/resources/purchaseOrder.xml")),
                PurchaseOrder.class);

        PurchaseOrder purchaseOrder = rootElement.getValue();

        System.out.println(purchaseOrder);
    }
}
