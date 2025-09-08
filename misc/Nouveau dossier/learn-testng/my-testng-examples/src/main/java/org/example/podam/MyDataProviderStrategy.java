package org.example.podam;

import uk.co.jemos.podam.api.AbstractRandomDataProviderStrategy;
import uk.co.jemos.podam.api.AttributeMetadata;

public class MyDataProviderStrategy extends AbstractRandomDataProviderStrategy {

    public MyDataProviderStrategy(int numberOfCollectionElts) {
        super(numberOfCollectionElts);
    }

//    @Override
//    public String getStringValue(AttributeMetadata attributeMetadata) {
//        log(attributeMetadata);
//        if ("firstname".equals(attributeMetadata.getAttributeName())) {
//
//        }
//
//        return getStringOfLength(PodamConstants.STR_DEFAULT_LENGTH,
//                attributeMetadata);
//    }

//    @Override
//    public Integer getInteger(AttributeMetadata attributeMetadata) {
//
//        return 10;
//    }
}
