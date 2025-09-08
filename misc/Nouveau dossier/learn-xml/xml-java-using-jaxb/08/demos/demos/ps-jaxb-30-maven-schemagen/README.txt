Generating a schema using Maven
===============================

You can find information on the Maven build tool here: http://maven.apache.org/

In this example, we are using a Maven plugin that you can find here: http://www.mojohaus.org/jaxb2-maven-plugin/Documentation/v2.3.1/

Use the following command in a terminal:

mvn clean package

This will generate purchaseOrder.xsd from the Java source files, then compile the source files and package the compiled classes and the XSD in a JAR file in the directory 'target'.
