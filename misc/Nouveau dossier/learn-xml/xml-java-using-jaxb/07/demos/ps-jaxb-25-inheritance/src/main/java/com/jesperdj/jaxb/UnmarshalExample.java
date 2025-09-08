package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.Address;
import com.jesperdj.jaxb.domain.BillingAddress;
import com.jesperdj.jaxb.domain.PurchaseOrder;
import com.jesperdj.jaxb.domain.ShippingAddress;
import org.xml.sax.SAXException;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.File;

public class UnmarshalExample {

    public static void main(String[] args) throws JAXBException, SAXException {
        JAXBContext context = JAXBContext.newInstance("com.jesperdj.jaxb.domain");
        Unmarshaller unmarshaller = context.createUnmarshaller();

        PurchaseOrder purchaseOrder =
                (PurchaseOrder) unmarshaller.unmarshal(new File("purchaseOrder.xml"));

        for (Address address : purchaseOrder.getCustomer().getAddress()) {
            if (address instanceof ShippingAddress) {
                System.out.printf("Ship to: %s, %s %s, %s%n",
                        address.getStreet(), address.getCity(), address.getPostalCode(),
                        address.getCountry());
            } else if (address instanceof BillingAddress) {
                System.out.printf("Bill to: %s, %s %s, %s%n",
                        address.getStreet(), address.getCity(), address.getPostalCode(),
                        address.getCountry());
            }
        }
    }
}
