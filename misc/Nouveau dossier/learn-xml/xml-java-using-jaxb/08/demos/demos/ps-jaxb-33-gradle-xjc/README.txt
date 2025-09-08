Generating Java classes using Gradle
====================================

You can find information on the Gradle build tool here: https://gradle.org/

In this example, we are using a Gradle plugin that you can find here: https://github.com/IntershopCommunicationsAG/jaxb-gradle-plugin

Use the following command in a terminal:

gradle clean build

This will generate Java domain model classes from the schema src/main/resources/purchaseOrder.xsd, using the bindings file src/main/resources/bindings.xjb. The generated sources are written to the directory build/generated/jaxb/java/example/com/jesperdj/jaxb/domain, and will be compiled and packaged into the JAR file that Gradle builds.
