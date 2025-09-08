package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.PurchaseOrder;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.SchemaOutputResolver;
import javax.xml.transform.Result;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.IOException;

public class GenerateSchemaExample {

    public static void main(String[] args) throws JAXBException, IOException {
        JAXBContext context = JAXBContext.newInstance(PurchaseOrder.class);

        // Generate an XML Schema
        context.generateSchema(new SchemaOutputResolver() {
            @Override
            public Result createOutput(String namespaceUri, String suggestedFileName) throws IOException {
                File outputFile = new File("purchaseOrder.xsd");
                System.out.println("Generating file: " + outputFile + " for namespace: " + namespaceUri);
                return new StreamResult(outputFile);
            }
        });
    }
}
