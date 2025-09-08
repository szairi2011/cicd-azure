package starter.acceptancetests.duckduckgo;

import net.serenitybdd.annotations.Managed;
import net.serenitybdd.core.Serenity;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.junit5.SerenityJUnit5Extension;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.WebDriver;

@ExtendWith(SerenityJUnit5Extension.class)
//public class WhenSearchingByKeyword extends PageObject {
public class WhenSearchingByKeyword {

    //    @Managed(driver = "chrome", options = "headless")
    @Managed(driver = "chrome")
    WebDriver driver;

    NavigateActions navigate;
    SearchActions search;
    SearchResultSidebar searchResultSidebar;

    @Test
    public void the_key_word_should_appear_in_the_results_sidebar() {
        navigate.to_the_duckduckgo_search_page();
        search.by_keyword("cucumber");
        Serenity.reportThat("The keyword should appear in the sidebar heading",
                () -> assertThat(searchResultSidebar.heading()).isEqualTo("Cucumber"));
    }

}
