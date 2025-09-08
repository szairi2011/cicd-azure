Generating Java classes using Maven
===================================

You can find information on the Maven build tool here: http://maven.apache.org/

In this example, we are using a Maven plugin that you can find here: http://www.mojohaus.org/jaxb2-maven-plugin/Documentation/v2.3.1/

Use the following command in a terminal:

mvn clean package

This will generate Java domain model classes from the schema src/main/resources/purchaseOrder.xsd, using the bindings file src/main/resources/bindings.xjb. The generated sources are written to the directory target/generated-sources/jaxb/com/jesperdj/jaxb/domain, and will be compiled and packaged into the JAR file that Maven builds.
