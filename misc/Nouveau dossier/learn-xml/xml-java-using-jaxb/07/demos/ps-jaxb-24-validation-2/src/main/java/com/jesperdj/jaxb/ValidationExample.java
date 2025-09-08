package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.Address;
import com.jesperdj.jaxb.domain.Customer;
import com.jesperdj.jaxb.domain.ExampleErrorHandler;
import com.jesperdj.jaxb.domain.Item;
import com.jesperdj.jaxb.domain.Loyalty;
import com.jesperdj.jaxb.domain.ObjectFactory;
import com.jesperdj.jaxb.domain.PurchaseOrder;
import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.util.JAXBSource;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.transform.Source;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.GregorianCalendar;

public class ValidationExample {

    public static void main(String[] args) throws JAXBException, DatatypeConfigurationException, IOException, SAXException {
        PurchaseOrder purchaseOrder = createPurchaseOrder();

        JAXBContext context = JAXBContext.newInstance("com.jesperdj.jaxb.domain");

        SchemaFactory schemaFactory =
                SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
        Schema schema = schemaFactory.newSchema(new File("purchaseOrder.xsd"));

        Validator validator = schema.newValidator();
        validator.setErrorHandler(new ExampleErrorHandler());

        Source source = new JAXBSource(context, purchaseOrder);
        validator.validate(source);
    }

    private static PurchaseOrder createPurchaseOrder() throws DatatypeConfigurationException {
        ObjectFactory objectFactory = new ObjectFactory();

        PurchaseOrder purchaseOrder = objectFactory.createPurchaseOrder();

        DatatypeFactory datatypeFactory = DatatypeFactory.newInstance();
        XMLGregorianCalendar calendar =
                datatypeFactory.newXMLGregorianCalendar(new GregorianCalendar());

//        purchaseOrder.setOrderDate(calendar);

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
