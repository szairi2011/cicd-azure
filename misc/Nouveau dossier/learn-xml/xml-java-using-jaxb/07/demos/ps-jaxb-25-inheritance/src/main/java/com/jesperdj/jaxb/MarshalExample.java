package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.BillingAddress;
import com.jesperdj.jaxb.domain.Customer;
import com.jesperdj.jaxb.domain.Item;
import com.jesperdj.jaxb.domain.Loyalty;
import com.jesperdj.jaxb.domain.ObjectFactory;
import com.jesperdj.jaxb.domain.PurchaseOrder;
import com.jesperdj.jaxb.domain.ShippingAddress;
import org.xml.sax.SAXException;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import java.math.BigDecimal;
import java.util.GregorianCalendar;

public class MarshalExample {

    public static void main(String[] args) throws JAXBException, DatatypeConfigurationException, SAXException {
        PurchaseOrder purchaseOrder = createPurchaseOrder();

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

        ShippingAddress shippingAddress = objectFactory.createShippingAddress();
        shippingAddress.setStreet("123 Main Street");
        shippingAddress.setCity("Exampleville");
        shippingAddress.setPostalCode("12345");
        shippingAddress.setCountry("USA");

        BillingAddress billingAddress = objectFactory.createBillingAddress();
        billingAddress.setStreet("456 Business Avenue");
        billingAddress.setCity("Demo City");
        billingAddress.setPostalCode("54321");
        billingAddress.setCountry("USA");

        customer.getAddress().add(shippingAddress);
        customer.getAddress().add(billingAddress);
        customer.setLoyalty(Loyalty.SILVER);

        purchaseOrder.setCustomer(customer);

        return purchaseOrder;
    }
}
