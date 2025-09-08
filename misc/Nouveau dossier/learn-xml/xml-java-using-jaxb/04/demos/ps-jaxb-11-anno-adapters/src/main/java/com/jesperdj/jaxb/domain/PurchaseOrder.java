package com.jesperdj.jaxb.domain;

import com.jesperdj.jaxb.adapters.ItemsAdapter;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.util.Date;
import java.util.Map;

@XmlRootElement
public class PurchaseOrder {
    @XmlAttribute
    @XmlSchemaType(name = "date")
    private Date orderDate;

    @XmlJavaTypeAdapter(ItemsAdapter.class)
    private Map<String, Item> items;

    private Customer customer;
    private String comment;

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Map<String, Item> getItems() {
        return items;
    }

    public void setItems(Map<String, Item> items) {
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
