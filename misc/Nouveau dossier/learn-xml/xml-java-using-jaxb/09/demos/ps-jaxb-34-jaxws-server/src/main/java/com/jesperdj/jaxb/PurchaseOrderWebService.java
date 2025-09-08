package com.jesperdj.jaxb;

import com.jesperdj.jaxb.domain.PurchaseOrder;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.ws.Endpoint;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@WebService(name = "PurchaseOrders",
        serviceName = "PurchaseOrderService",
        portName = "PurchaseOrderPort",
        targetNamespace = "http://www.jesperdj.com/ps-jaxb")
public class PurchaseOrderWebService {

    private final AtomicLong ID_GENERATOR = new AtomicLong();

    private final Map<Long, PurchaseOrder> purchaseOrders = new HashMap<>();

    @WebMethod
    @WebResult(name = "orders")
    public List<PurchaseOrder> getOrders() {
        return new ArrayList<>(purchaseOrders.values());
    }

    @WebMethod
    @WebResult(name = "order")
    public PurchaseOrder getOrder(@WebParam(name = "id") long id) {
        if (purchaseOrders.containsKey(id)) {
            return purchaseOrders.get(id);
        } else {
            throw new IllegalArgumentException("Order not found: " + id);
        }
    }

    @WebMethod
    @WebResult(name = "id")
    public long addOrder(@WebParam(name = "order") PurchaseOrder purchaseOrder) {
        long id = ID_GENERATOR.incrementAndGet();
        purchaseOrder.setId(id);
        purchaseOrders.put(id, purchaseOrder);
        return id;
    }

    @WebMethod
    public void deleteOrder(@WebParam(name = "id") long id) {
        purchaseOrders.remove(id);
    }

    public static void main(String[] args) {
        Endpoint.publish("http://localhost:8080/po", new PurchaseOrderWebService());
        System.out.println("Running...");
    }
}
