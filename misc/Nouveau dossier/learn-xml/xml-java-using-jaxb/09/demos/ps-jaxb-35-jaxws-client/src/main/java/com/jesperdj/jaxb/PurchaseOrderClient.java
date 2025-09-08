package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.Address;
import com.jesperdj.jaxb.domain.Customer;
import com.jesperdj.jaxb.domain.Item;
import com.jesperdj.jaxb.domain.Loyalty;
import com.jesperdj.jaxb.domain.ObjectFactory;
import com.jesperdj.jaxb.domain.PurchaseOrder;
import com.jesperdj.jaxb.domain.PurchaseOrderService;
import com.jesperdj.jaxb.domain.PurchaseOrders;

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import java.math.BigDecimal;
import java.util.GregorianCalendar;

public class PurchaseOrderClient {

    public static void main(String[] args) throws DatatypeConfigurationException {
        PurchaseOrderService service = new PurchaseOrderService();
        PurchaseOrders port = service.getPurchaseOrderPort();

        long id = port.addOrder(createPurchaseOrder());
        System.out.println("Order created with id: " + id);

        for (PurchaseOrder purchaseOrder : port.getOrders()) {
            System.out.println("Found order: " + purchaseOrder.getId());
            System.out.println("  Number of items: " + purchaseOrder.getItems().getItem().size());
            for (Item item : purchaseOrder.getItems().getItem()) {
                System.out.println("    Item: " + item.getProductName() + ", quantity: " + item.getQuantity());
            }
            System.out.println("  Customer: " + purchaseOrder.getCustomer().getName());
        }
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
        item1.setComment("Blue ink");

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
