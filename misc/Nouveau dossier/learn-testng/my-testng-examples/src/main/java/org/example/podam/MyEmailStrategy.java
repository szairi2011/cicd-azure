package org.example.podam;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import uk.co.jemos.podam.common.AttributeStrategy;

import java.util.List;

//public class MyEmailStrategy implements AttributeStrategy<String>, WorkflowCtxAwareStrategy {

public class MyEmailStrategy implements AttributeStrategy<String> {

    private static final MyEmailStrategy INSTANCE = getInstance();

    public static MyEmailStrategy getInstance() {
        if (null == INSTANCE)
            return new MyEmailStrategy();
        return INSTANCE;
    }

    /**
     * @param attrType        an attribute's type
     * @param attrAnnotations list of annotations attached to an attribute
     * @return
     */
    @Override
    public String getValue(Class attrType, List attrAnnotations) {

        // e.g. Do something with the injected trade context object some examples below ...
//        context.getTrade();
//        context.getRequest();
//        context.getRptIDCounter().next();

        StringBuilder sb = new StringBuilder();
        sb.append("sofien2").append(".").append("zairi")
                .append("@")
                .append("fisglobal").append(".").append("com");

        return sb.toString();
    }

    @Accessors(fluent = true) @Getter @Setter //Build a fluent like getters and setters
    WorkflowContext context;



}
