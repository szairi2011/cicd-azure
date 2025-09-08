package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.Address;
import com.jesperdj.jaxb.domain.Customer;
import com.jesperdj.jaxb.domain.Item;
import com.jesperdj.jaxb.domain.Loyalty;
import com.jesperdj.jaxb.domain.ObjectFactory;
import com.jesperdj.jaxb.domain.PurchaseOrder;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import java.math.BigDecimal;
import java.util.GregorianCalendar;

public class MarshalExample {

    public static void main(String[] args) throws JAXBException, DatatypeConfigurationException {
        PurchaseOrder purchaseOrder = createPurchaseOrder();

//        JAXBContext context = JAXBContext.newInstance(PurchaseOrder.class);
//        JAXBContext context = JAXBContext.newInstance(ObjectFactory.class);
        JAXBContext context = JAXBContext.newInstance("com.jesperdj.jaxb.domain");
        Marshaller marshaller = context.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

        marshaller.marshal(purchaseOrder, System.out);
    }

    private static PurchaseOrder createPurchaseOrder() throws DatatypeConfigurationException {
        ObjectFactory objectFactory = new ObjectFactory();

        PurchaseOrder purchaseOrder = objectFactory.createPurchaseOrder();

        DatatypeFactory datatypeFactory = DatatypeFactory.newInstance();
        XMLGregorianCalendar calendar =
                datatypeFactory.newXMLGregorianCalendar(new GregorianCalendar());

        purchaseOrder.setOrderDate(calendar);

        Item item1 = objectFactory.createItem();
        item1.setProductName("Ballpoint Pen");
        item1.setQuantity(20);
        item1.setPrice(new BigDecimal("8.95"));
        item1.setComment(objectFactory.createItemComment("Blue ink"));

        Item item2 = objectFactory.createItem();
        item2.setProductName("Pencil");
        item2.setQuantity(10);
        item2.setPrice(new BigDecimal("2.95"));

        PurchaseOrder.Items items = objectFactory.createPurchaseOrderItems();
        items.getItem().add(item1);
        items.getItem().add(item2);

        purchaseOrder.setItems(items);

        Customer customer = objectFactory.createCustomer();
        customer.setName("John Doe");

        Address address = objectFactory.createAddress();
        address.setStreet("123 Main Street");
        address.setCity("Exampleville");
        address.setPostalCode("12345");
        address.setCountry("USA");

        customer.setShippingAddress(address);
        customer.setBillingAddress(address);
        customer.setLoyalty(Loyalty.SILVER);

        purchaseOrder.setCustomer(customer);

        return purchaseOrder;
    }
}
