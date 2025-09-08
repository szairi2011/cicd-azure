package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.Address;
import com.jesperdj.jaxb.domain.Customer;
import com.jesperdj.jaxb.domain.Item;
import com.jesperdj.jaxb.domain.Loyalty;
import com.jesperdj.jaxb.domain.PurchaseOrder;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.namespace.QName;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;
import java.math.BigDecimal;
import java.util.Arrays;

/**
 * Example that shows how you can marshal an object into a StAX stream.
 */
public class MarshallingExample2 {

    public static void main(String[] args) throws JAXBException, XMLStreamException {
        PurchaseOrder purchaseOrder = createPurchaseOrder();

        // Create the JAXB content and a marshaller
        JAXBContext context = JAXBContext.newInstance(PurchaseOrder.class);
        Marshaller marshaller = context.createMarshaller();

        // Let the marshaller know we do not want it to write a complete XML document
        marshaller.setProperty(Marshaller.JAXB_FRAGMENT, true);

        // Create a JAXB element wrapper
        QName rootElementName = new QName(null, "purchaseOrder");
        JAXBElement<PurchaseOrder> rootElement =
                new JAXBElement<>(rootElementName, PurchaseOrder.class, purchaseOrder);

        // Use the StAX API to create an XML document
        XMLStreamWriter writer =
                XMLOutputFactory.newInstance().createXMLStreamWriter(System.out);
        writer.writeStartDocument("UTF-8", "1.0");
        writer.writeStartElement("orders");

        // Marshal the PurchaseOrder into the StAX stream
        marshaller.marshal(rootElement, writer);

        writer.writeEndElement();
        writer.writeEndDocument();
        writer.close();
    }

    private static PurchaseOrder createPurchaseOrder() {
        PurchaseOrder purchaseOrder = new PurchaseOrder();

        Item item1 = new Item();
        item1.setProductName("Ballpoint Pen");
        item1.setQuantity(20);
        item1.setPrice(new BigDecimal("8.95"));
        item1.setComment("Blue ink");

        Item item2 = new Item();
        item2.setProductName("Pencil");
        item2.setQuantity(10);
        item2.setPrice(new BigDecimal("2.95"));

        purchaseOrder.setItems(Arrays.asList(item1, item2));

        Customer customer = new Customer();
        customer.setName("John Doe");

        Address address = new Address();
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
