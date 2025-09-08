package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.PurchaseOrder;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.File;

public class UnmarshalExample {

    public static void main(String[] args) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(PurchaseOrder.class);
        Unmarshaller unmarshaller = context.createUnmarshaller();

        PurchaseOrder purchaseOrder = (PurchaseOrder) unmarshaller.unmarshal(new File("purchaseOrder.xml"));

        System.out.println("Customer loyalty: " + purchaseOrder.getCustomer().getLoyalty());
    }
}
