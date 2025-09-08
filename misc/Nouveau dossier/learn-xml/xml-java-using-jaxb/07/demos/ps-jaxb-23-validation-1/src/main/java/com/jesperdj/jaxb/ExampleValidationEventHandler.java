package com.jesperdj.jaxb;

import org.w3c.dom.Node;

import javax.xml.bind.ValidationEvent;
import javax.xml.bind.ValidationEventHandler;
import javax.xml.bind.ValidationEventLocator;
import java.net.URL;

public class ExampleValidationEventHandler implements ValidationEventHandler {

    @Override
    public boolean handleEvent(ValidationEvent event) {
        System.out.printf("%s: %s%n",
                getSeverityAsText(event.getSeverity()), event.getMessage());

        Throwable exception = event.getLinkedException();
        if (exception != null) {
            System.out.printf("- Exception: [%s] %s%n",
                    exception.getClass().getName(), exception.getMessage());
        }

        ValidationEventLocator locator = event.getLocator();

        URL url = locator.getURL();
        if (url != null) {
            System.out.printf("- URL: %s%n", url);
        }

        System.out.printf("- Line: %s, column: %s%n",
                getLocationIndexAsText(locator.getLineNumber()),
                getLocationIndexAsText(locator.getColumnNumber()));

        Node node = locator.getNode();
        if (node != null) {
            System.out.printf("- Node: %s%n", node.getLocalName());
        }

        Object object = locator.getObject();
        if (object != null) {
            System.out.printf("- Object: [%s] %s%n", object.getClass().getName(), object);
        }

        return true;
    }

    private String getSeverityAsText(int severity) {
        switch (severity) {
            case ValidationEvent.WARNING:
                return "WARNING";
            case ValidationEvent.ERROR:
                return "ERROR";
            case ValidationEvent.FATAL_ERROR:
                return "FATAL ERROR";
            default:
                return "UNKNOWN";
        }
    }

    private String getLocationIndexAsText(int index) {
        return index != -1 ? Integer.toString(index) : "(unknown)";
    }
}
