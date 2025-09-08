package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.PurchaseOrder;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;

/**
 * Example that shows how you can unmarshal an object from a DOM tree.
 */
public class UnmarshallingExample2 {

    public static void main(String[] args) throws JAXBException, ParserConfigurationException, IOException, SAXException {
        // Create the JAXB context and an unmarshaller
        JAXBContext context = JAXBContext.newInstance(PurchaseOrder.class);
        Unmarshaller unmarshaller = context.createUnmarshaller();

        // Read the XML using the DOM API
        DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
        Document document = builder.parse(new File("src/main/resources/purchaseOrder.xml"));

        // Unmarshal from the DOM tree
        JAXBElement<PurchaseOrder> rootElement =
                unmarshaller.unmarshal(document.getDocumentElement(), PurchaseOrder.class);

        // Get the PurchaseOrder object from the JAXB element
        PurchaseOrder purchaseOrder = rootElement.getValue();

        System.out.println("Purchase order for: " + purchaseOrder.getCustomer().getName());
    }
}
