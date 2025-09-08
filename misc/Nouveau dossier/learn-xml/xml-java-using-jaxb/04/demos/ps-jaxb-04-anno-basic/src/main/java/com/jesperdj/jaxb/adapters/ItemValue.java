package com.jesperdj.jaxb.adapters;

import com.jesperdj.jaxb.domain.Item;

import javax.xml.bind.annotation.XmlAccessorOrder;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import java.math.BigDecimal;

@XmlType(propOrder = {"productName", "comment", "quantity", "price"})
public class ItemValue {

    private Item item;
    @XmlAttribute
    private String productCode;
    private String productName;
    private String comment;
    private int quantity;
    private BigDecimal price;

    public ItemValue(String productCode, Item item) {
        this.productCode = productCode;
        this.item = item;
        init();
    }

    private void init() {
        this.productName = item.getProductName();
        this.comment = item.getComment();
        this.quantity = item.getQuantity();
        this.price = item.getPrice();
    }
    @XmlElement
    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
    @XmlElement
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
    @XmlElement
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    @XmlElement
    public BigDecimal getPrice() {
        return price;
    }
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
