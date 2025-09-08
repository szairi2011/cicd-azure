package com.example.testng;

import io.qameta.allure.*;
import org.testng.annotations.Test;
@Epic(value = "FISCD-Epic-123")
@Feature(value = "FISCD-Feat-456")
public class StepTest {

    private static final String GLOBAL_PARAMETER = "global value";

    @Test
    @Story(value = "FISCD-story-1234")
    public void annotatedStepTest() {
        annotatedStep("local value");
    }

    @Test
    @Story(value = "FISCD-story-1235")
    public void lambdaStepTest() {
        final String localParameter = "parameter value";
        Allure.step(String.format("Parent lambda step with parameter [%s]", localParameter), (step) -> {
            step.parameter("parameter", localParameter);
            Allure.step(String.format("Nested lambda step with global parameter [%s]", GLOBAL_PARAMETER));
        });
    }

    @Step("Parent annotated step with parameter [{parameter}]")
    public void annotatedStep(final String parameter) {
        nestedAnnotatedStep();
    }

    @Step("Nested annotated step with global parameter [{this.GLOBAL_PARAMETER}]")
    public void nestedAnnotatedStep() {

    }

}
