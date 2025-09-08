Running schemagen
=================

Use the schemagen tool (included with the JDK) to generate an XSD from the domain model classes.

First compile the Java classes:

mvn compile

Then run the schemagen tool:

schemagen -cp target/classes -encoding UTF-8 com.jesperdj.jaxb.domain.PurchaseOrder     # macOS, Linux
schemagen -cp target\classes -encoding UTF-8 com.jesperdj.jaxb.domain.PurchaseOrder     # Windows

warning: Supported source version 'RELEASE_7' from annotation processor 'com.sun.tools.internal.jxc.ap.SchemaGenerator' less than -source '1.8'
Note: Writing D:\Projects\ps-jaxb\ps-jaxb-12-schemagen\schema1.xsd

The warning is not important.

(schemagen can also generate a schema from Java source files instead of class files, but it will compile the class files first if you do that).
