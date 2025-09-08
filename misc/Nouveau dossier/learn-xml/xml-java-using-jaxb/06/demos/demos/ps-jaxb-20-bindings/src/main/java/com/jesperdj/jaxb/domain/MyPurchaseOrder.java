package com.jesperdj.jaxb.domain;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;
import java.util.List;

@XmlRootElement
public class MyPurchaseOrder {
    @XmlAttribute
    private Date orderDate;

    @XmlElementWrapper(name = "items")
    @XmlElement(name = "item")
    private List<ItemType> items;

    private CustomerType customer;

    private String comment;

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public List<ItemType> getItems() {
        return items;
    }

    public void setItems(List<ItemType> items) {
        this.items = items;
    }

    public CustomerType getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerType customer) {
        this.customer = customer;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
