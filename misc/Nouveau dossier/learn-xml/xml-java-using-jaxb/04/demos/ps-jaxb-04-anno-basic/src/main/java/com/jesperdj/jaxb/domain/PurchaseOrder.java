package com.jesperdj.jaxb.domain;

import com.jesperdj.jaxb.adapters.ItemsAdapter;
import lombok.ToString;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.util.Date;
import java.util.List;
import java.util.Map;

@ToString
@XmlRootElement
public class PurchaseOrder {
    @XmlAttribute
//    @XmlSchemaType(name = "date") -- THis is set in the package-info.java to apply at the package level to all domain objects
    private Date orderDate;

    @XmlElementWrapper(name = "items")
    @XmlElement(name = "item")
    private List<Item> items;

    public void setItemsMap(Map<String, Item> itemsMap) {
        this.itemsMap = itemsMap;
    }

    @XmlJavaTypeAdapter(ItemsAdapter.class)
    Map<String, Item> itemsMap;

    private Customer customer;
    private String comment;

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
