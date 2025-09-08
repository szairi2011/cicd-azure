
package com.jesperdj.jaxb.domain;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.jesperdj.jaxb.domain package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _GetOrdersResponse_QNAME = new QName("http://www.jesperdj.com/ps-jaxb", "getOrdersResponse");
    private final static QName _DeleteOrderResponse_QNAME = new QName("http://www.jesperdj.com/ps-jaxb", "deleteOrderResponse");
    private final static QName _GetOrder_QNAME = new QName("http://www.jesperdj.com/ps-jaxb", "getOrder");
    private final static QName _AddOrder_QNAME = new QName("http://www.jesperdj.com/ps-jaxb", "addOrder");
    private final static QName _PurchaseOrder_QNAME = new QName("http://www.jesperdj.com/ps-jaxb", "purchaseOrder");
    private final static QName _GetOrders_QNAME = new QName("http://www.jesperdj.com/ps-jaxb", "getOrders");
    private final static QName _AddOrderResponse_QNAME = new QName("http://www.jesperdj.com/ps-jaxb", "addOrderResponse");
    private final static QName _DeleteOrder_QNAME = new QName("http://www.jesperdj.com/ps-jaxb", "deleteOrder");
    private final static QName _GetOrderResponse_QNAME = new QName("http://www.jesperdj.com/ps-jaxb", "getOrderResponse");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.jesperdj.jaxb.domain
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link PurchaseOrder }
     * 
     */
    public PurchaseOrder createPurchaseOrder() {
        return new PurchaseOrder();
    }

    /**
     * Create an instance of {@link DeleteOrderResponse }
     * 
     */
    public DeleteOrderResponse createDeleteOrderResponse() {
        return new DeleteOrderResponse();
    }

    /**
     * Create an instance of {@link GetOrdersResponse }
     * 
     */
    public GetOrdersResponse createGetOrdersResponse() {
        return new GetOrdersResponse();
    }

    /**
     * Create an instance of {@link GetOrder }
     * 
     */
    public GetOrder createGetOrder() {
        return new GetOrder();
    }

    /**
     * Create an instance of {@link AddOrder }
     * 
     */
    public AddOrder createAddOrder() {
        return new AddOrder();
    }

    /**
     * Create an instance of {@link AddOrderResponse }
     * 
     */
    public AddOrderResponse createAddOrderResponse() {
        return new AddOrderResponse();
    }

    /**
     * Create an instance of {@link DeleteOrder }
     * 
     */
    public DeleteOrder createDeleteOrder() {
        return new DeleteOrder();
    }

    /**
     * Create an instance of {@link GetOrderResponse }
     * 
     */
    public GetOrderResponse createGetOrderResponse() {
        return new GetOrderResponse();
    }

    /**
     * Create an instance of {@link GetOrders }
     * 
     */
    public GetOrders createGetOrders() {
        return new GetOrders();
    }

    /**
     * Create an instance of {@link Item }
     * 
     */
    public Item createItem() {
        return new Item();
    }

    /**
     * Create an instance of {@link Address }
     * 
     */
    public Address createAddress() {
        return new Address();
    }

    /**
     * Create an instance of {@link Customer }
     * 
     */
    public Customer createCustomer() {
        return new Customer();
    }

    /**
     * Create an instance of {@link PurchaseOrder.Items }
     * 
     */
    public PurchaseOrder.Items createPurchaseOrderItems() {
        return new PurchaseOrder.Items();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetOrdersResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.jesperdj.com/ps-jaxb", name = "getOrdersResponse")
    public JAXBElement<GetOrdersResponse> createGetOrdersResponse(GetOrdersResponse value) {
        return new JAXBElement<GetOrdersResponse>(_GetOrdersResponse_QNAME, GetOrdersResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DeleteOrderResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.jesperdj.com/ps-jaxb", name = "deleteOrderResponse")
    public JAXBElement<DeleteOrderResponse> createDeleteOrderResponse(DeleteOrderResponse value) {
        return new JAXBElement<DeleteOrderResponse>(_DeleteOrderResponse_QNAME, DeleteOrderResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetOrder }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.jesperdj.com/ps-jaxb", name = "getOrder")
    public JAXBElement<GetOrder> createGetOrder(GetOrder value) {
        return new JAXBElement<GetOrder>(_GetOrder_QNAME, GetOrder.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link AddOrder }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.jesperdj.com/ps-jaxb", name = "addOrder")
    public JAXBElement<AddOrder> createAddOrder(AddOrder value) {
        return new JAXBElement<AddOrder>(_AddOrder_QNAME, AddOrder.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link PurchaseOrder }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.jesperdj.com/ps-jaxb", name = "purchaseOrder")
    public JAXBElement<PurchaseOrder> createPurchaseOrder(PurchaseOrder value) {
        return new JAXBElement<PurchaseOrder>(_PurchaseOrder_QNAME, PurchaseOrder.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetOrders }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.jesperdj.com/ps-jaxb", name = "getOrders")
    public JAXBElement<GetOrders> createGetOrders(GetOrders value) {
        return new JAXBElement<GetOrders>(_GetOrders_QNAME, GetOrders.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link AddOrderResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.jesperdj.com/ps-jaxb", name = "addOrderResponse")
    public JAXBElement<AddOrderResponse> createAddOrderResponse(AddOrderResponse value) {
        return new JAXBElement<AddOrderResponse>(_AddOrderResponse_QNAME, AddOrderResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DeleteOrder }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.jesperdj.com/ps-jaxb", name = "deleteOrder")
    public JAXBElement<DeleteOrder> createDeleteOrder(DeleteOrder value) {
        return new JAXBElement<DeleteOrder>(_DeleteOrder_QNAME, DeleteOrder.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetOrderResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.jesperdj.com/ps-jaxb", name = "getOrderResponse")
    public JAXBElement<GetOrderResponse> createGetOrderResponse(GetOrderResponse value) {
        return new JAXBElement<GetOrderResponse>(_GetOrderResponse_QNAME, GetOrderResponse.class, null, value);
    }

}
