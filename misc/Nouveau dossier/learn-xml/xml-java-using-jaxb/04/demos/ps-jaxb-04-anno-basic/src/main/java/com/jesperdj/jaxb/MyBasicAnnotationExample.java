package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.*;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class MyBasicAnnotationExample {

    public static void main(String[] args) throws JAXBException {

        PurchaseOrder purchaseOrder = createPurchaseOrder();

        JAXBContext context = JAXBContext.newInstance(PurchaseOrder.class);

        Marshaller marshaller = context.createMarshaller();

        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

        marshaller.marshal(purchaseOrder, System.out);
    }

    private static PurchaseOrder createPurchaseOrder() {

        PurchaseOrder purchaseOrder = new PurchaseOrder();

        purchaseOrder.setOrderDate(new Date());

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

        Map<String, Item> itemsMap = new HashMap<>();
        itemsMap.put("100348", item1);
        itemsMap.put("235607", item2);

        purchaseOrder.setItemsMap(itemsMap);

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
