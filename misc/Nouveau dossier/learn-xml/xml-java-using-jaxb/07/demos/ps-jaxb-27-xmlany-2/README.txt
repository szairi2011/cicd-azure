Running xjc
===========

Running xjc to generate domain model classes for both schemas:

xjc -d src/main/java -p com.jesperdj.jaxb.domain.po -encoding UTF-8 purchaseOrder.xsd       # macOS, Linux
xjc -d src\main\java -p com.jesperdj.jaxb.domain.po -encoding UTF-8 purchaseOrder.xsd       # Windows

xjc -d src/main/java -p com.jesperdj.jaxb.domain.inv -encoding UTF-8 inventory.xsd          # macOS, Linux
xjc -d src\main\java -p com.jesperdj.jaxb.domain.inv -encoding UTF-8 inventory.xsd          # Window
