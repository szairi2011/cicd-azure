import org.example.tests.UserManager;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

@Test(enabled = false)
public class UserManagerTest {

    private UserManager um;

    @BeforeMethod
    public void setUp() {
        // Arrange
        um = new UserManager();
    }

    @Test(enabled = false)
    public void test_successful_added_user() {
        // Act
        boolean result = um.addUser("sou@company.com");

        // Assert
        Assert.assertTrue(result);
    }

    @AfterMethod
    public void cleanUp() {

    }
}
