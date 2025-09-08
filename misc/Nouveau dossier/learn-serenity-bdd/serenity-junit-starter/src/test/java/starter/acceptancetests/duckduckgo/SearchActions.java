package starter.acceptancetests.duckduckgo;

import net.serenitybdd.annotations.Step;
import net.serenitybdd.core.pages.WebElementFacade;
import net.serenitybdd.core.steps.UIInteractions;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;

public class SearchActions extends UIInteractions {
    @Step("Search for '{0}'")
    public void by_keyword(String keyword) {
        $("#searchbox_input").sendKeys(keyword, Keys.ENTER);
//        WebElementFacade searchField = $(By.id("searchbox_input"));
//        searchField.shouldBeVisible();
//        searchField.typeAndEnter(keyword);
    }
}
