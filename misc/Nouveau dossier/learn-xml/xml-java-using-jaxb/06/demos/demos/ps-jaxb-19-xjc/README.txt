Running xjc
===========

Use the xjc tool (included with the JDK) to generate Java domain model classes from the XSD.

First, make sure the directory for the domain model classes exists:

mkdir -p src/main/java/com/jesperdj/jaxb/domain         # macOS, Linux
mkdir src\main\java\com\jesperdj\jaxb\domain            # Windows

Then run the xjc tool:

xjc -d src/main/java -p com.jesperdj.jaxb.domain -encoding UTF-8 purchaseOrder.xsd      # macOS, Linux
xjc -d src\main\java -p com.jesperdj.jaxb.domain -encoding UTF-8 purchaseOrder.xsd      # Windows
