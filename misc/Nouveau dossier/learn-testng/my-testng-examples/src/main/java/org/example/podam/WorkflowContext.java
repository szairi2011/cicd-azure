package org.example.podam;

import lombok.Data;

@Data
public class WorkflowContext {
    Trade trade;
    OperationRequest request;
    RptIDCounter rptIDCounter;


}

@Data
class Trade {
    long tradeID;
}

@Data
class OperationRequest {
    long tradeID;
}

class RptIDCounter {
    int counter;
    int next() {
        return ++counter;
    }
}