package org.example.podam;

import uk.co.jemos.podam.api.AbstractRandomDataProviderStrategy;
import uk.co.jemos.podam.common.AttributeStrategy;

public class MyPodamDataProviderStrategy extends AbstractRandomDataProviderStrategy {
    WorkflowContext context;

    public MyPodamDataProviderStrategy(int numberOfCollectionElts) {

        super(numberOfCollectionElts);
        initialize_strategies();
    }

    public MyPodamDataProviderStrategy(int numberOfCollectionElts, WorkflowContext context) {

        super(numberOfCollectionElts);
        this.context = context;
        initialize_strategies();
    }

    private void initialize_strategies() {
        addOrReplaceAttributeStrategy(Person.class, "email4", MyEmailStrategy.getInstance().context(context));
        addOrReplaceAttributeStrategy(Person.Hdr.class, "field2", MyEmailStrategy.getInstance().context(context));
        addOrReplaceAttributeStrategy(TrdCaptRpt.Hdr.class, "nestedField2", MyEmailStrategy.getInstance().context(context));
    }


}
