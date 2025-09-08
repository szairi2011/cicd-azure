package com.jesperdj.jaxb.domain;

import javax.xml.bind.annotation.XmlElement;
import java.math.BigDecimal;

public class Item {
    @XmlElement(required = true)
    private String productName;

    // Note: Because the primitive type int is used, it by default is required
    private int quantity;

    @XmlElement(required = true)
    private BigDecimal price;

    private String comment;

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
