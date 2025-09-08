Generating webservice client classes using wsimport
===================================================

Make sure the webservice is running.

To generate web service client and domain model classes from the WSDL that the web service provides, use the following command:

wsimport -s src/main/java -Xnocompile -keep -p com.jesperdj.jaxb.domain -encoding UTF-8 -verbose http://localhost:8080/po?wsdl   # macOS, Linux
wsimport -s src\main\java -Xnocompile -keep -p com.jesperdj.jaxb.domain -encoding UTF-8 -verbose http://localhost:8080/po?wsdl   # Windows
