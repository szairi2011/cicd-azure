package org.example.podam;

import uk.co.jemos.podam.api.AttributeMetadata;
import uk.co.jemos.podam.api.DataProviderStrategy;
import uk.co.jemos.podam.common.ManufacturingContext;
import uk.co.jemos.podam.typeManufacturers.StringTypeManufacturerImpl;

import java.lang.reflect.Type;
import java.util.Map;

public class MyStringManufacturer extends StringTypeManufacturerImpl {
    @Override
    public String getType(DataProviderStrategy strategy,
                          AttributeMetadata attributeMetadata,
                          ManufacturingContext manufacturingCtx) {

        if (Person.class.isAssignableFrom(attributeMetadata.getPojoClass())) {

            if ("email2".equals(attributeMetadata.getAttributeName())) {
                return "soulou2000@yahoo.fr";
            } else if ("postCode".equalsIgnoreCase(attributeMetadata.getAttributeName())) {
                return "00100";
            }
        }
        return super.getType(strategy, attributeMetadata, manufacturingCtx);
    };
}
