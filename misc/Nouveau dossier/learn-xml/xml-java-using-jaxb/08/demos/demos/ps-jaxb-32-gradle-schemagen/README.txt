Generating a schema using Gradle
================================

You can find information on the Gradle build tool here: https://gradle.org/

In this example, we are using a Gradle plugin that you can find here: https://github.com/IntershopCommunicationsAG/jaxb-gradle-plugin

Use the following command in a terminal:

gradle clean build

This will generate purchaseOrder.xsd from the Java source files, then compile the source files and package the compiled classes and the XSD in a JAR file in the directory build/libs.
