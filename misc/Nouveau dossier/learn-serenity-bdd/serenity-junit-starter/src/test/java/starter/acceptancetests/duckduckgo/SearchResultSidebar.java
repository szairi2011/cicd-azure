package starter.acceptancetests.duckduckgo;

import net.serenitybdd.core.pages.PageComponent;
import net.serenitybdd.core.pages.WebElementFacade;

public class SearchResultSidebar extends PageComponent {
    public String heading() {
        String title = getDriver().getTitle(); // We can use Webelement directly, or
        WebElementFacade sidebarHeading = $("[data-testid=about] h2"); // Use Webelementfacade which has a richer control like checking that element is visible first in case the html page loading is slow ...
        sidebarHeading.isVisible();
        return sidebarHeading.getText();
    }
}
