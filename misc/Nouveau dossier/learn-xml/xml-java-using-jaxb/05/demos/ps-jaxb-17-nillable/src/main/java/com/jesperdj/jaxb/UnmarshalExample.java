package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.Item;
import com.jesperdj.jaxb.domain.PurchaseOrder;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.math.BigDecimal;

public class UnmarshalExample {

    public static void main(String[] args) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(PurchaseOrder.class);
        Unmarshaller unmarshaller = context.createUnmarshaller();

        PurchaseOrder purchaseOrder = (PurchaseOrder) unmarshaller.unmarshal(new File("purchaseOrder.xml"));

        System.out.println("Purchase order for: " + purchaseOrder.getCustomer().getName());
        System.out.println("Order date: " + purchaseOrder.getOrderDate());
        BigDecimal totalPrice = BigDecimal.ZERO;
        for (Item item : purchaseOrder.getItems()) {
            System.out.println("Item: " + item.getProductName());
            System.out.println("  Quantity: " + item.getQuantity() + ", Price: " + item.getPrice());
            if (item.getComment() != null) {
                System.out.println("  Comment: " + item.getComment());
            }
            totalPrice = totalPrice.add(item.getPrice());
        }
        System.out.println("Order total: " + totalPrice);
    }
}
