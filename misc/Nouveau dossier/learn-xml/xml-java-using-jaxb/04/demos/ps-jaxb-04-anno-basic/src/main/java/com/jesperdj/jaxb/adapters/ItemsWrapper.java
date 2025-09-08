package com.jesperdj.jaxb.adapters;

import lombok.Data;
import lombok.ToString;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import java.util.List;

@ToString
//@Data
public class ItemsWrapper {

    List<ItemValue> items;

    public ItemsWrapper(List<ItemValue> items) {
        this.items = items;
    }
//    @XmlElementWrapper(name = "items-map")
    @XmlElement(name = "item")
    public List<ItemValue> getItems() {
        return items;
    }

    public void setItems(List<ItemValue> items) {
        this.items = items;
    }
}
