package com.jesperdj.jaxb.adapters;

import com.jesperdj.jaxb.domain.Item;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import java.util.Map;
import java.util.stream.Collectors;

public class ItemsAdapter extends XmlAdapter<ItemsWrapper, Map<String, Item>> {

    @Override
    public Map<String, Item> unmarshal(ItemsWrapper wrapper) throws Exception {
        return null;
    }

    @Override
    public ItemsWrapper marshal(Map<String, Item> map) throws Exception {
        return new ItemsWrapper(map.entrySet().stream().
                map(entry -> new ItemValue(entry.getKey(), entry.getValue())).
                collect(Collectors.toList()));
    }
}
