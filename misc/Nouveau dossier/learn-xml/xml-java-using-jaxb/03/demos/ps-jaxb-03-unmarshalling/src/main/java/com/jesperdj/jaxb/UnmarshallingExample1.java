package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.PurchaseOrder;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;
import java.io.File;
import java.io.IOException;

/**
 * Simple JAXB unmarshalling example.
 */
public class UnmarshallingExample1 {

    public static void main(String[] args) throws JAXBException, IOException {
        // Create the JAXB context
        JAXBContext context = JAXBContext.newInstance(PurchaseOrder.class);

        // Create an unmarshaller
        Unmarshaller unmarshaller = context.createUnmarshaller();

        // Unmarshal the XML
        JAXBElement<PurchaseOrder> rootElement = unmarshaller.unmarshal(
                new StreamSource(new File("src/main/resources/purchaseOrder.xml")),
                PurchaseOrder.class);

        // Get the PurchaseOrder object from the JAXB element
        PurchaseOrder purchaseOrder = rootElement.getValue();

        System.out.println("Purchase order for: " + purchaseOrder.getCustomer().getName());
    }
}
