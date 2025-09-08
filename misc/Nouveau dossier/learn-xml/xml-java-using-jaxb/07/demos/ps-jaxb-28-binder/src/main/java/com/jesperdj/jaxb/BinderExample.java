package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.Customer;
import com.jesperdj.jaxb.domain.Loyalty;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.xml.sax.SAXException;

import javax.xml.bind.Binder;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.IOException;

public class BinderExample {

    public static void main(String[] args) throws JAXBException, ParserConfigurationException, IOException, SAXException, TransformerException {
        JAXBContext context = JAXBContext.newInstance("com.jesperdj.jaxb.domain");

        // Parse purchaseOrder.xml using the DOM API
        DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
        documentBuilderFactory.setNamespaceAware(true);
        DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
        Document document = documentBuilder.parse(new File("purchaseOrder.xml"));

        // Find the <customer> element in the DOM tree
        Node domElement = document.getElementsByTagName("customer").item(0);

        // Create a Binder
        Binder<Node> binder = context.createBinder();

        // Unmarshal the <customer> element into a Customer object
        // Need to use JAXBElement here because class Customer does not have @XmlRootElement
        JAXBElement<Customer> jaxbElement = binder.unmarshal(domElement, Customer.class);
        Customer customer = jaxbElement.getValue();

        // Modify the Customer object
        customer.setName("Susan Jones");
        customer.setLoyalty(Loyalty.GOLD);

        // Update the <customer> element in the DOM tree
        binder.updateXML(customer);

        // Output the updated DOM Document as XML (using the XML Transformation API)
        Transformer transformer = TransformerFactory.newInstance().newTransformer();
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
        transformer.transform(new DOMSource(document), new StreamResult(System.out));
    }
}
