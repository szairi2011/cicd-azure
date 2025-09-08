import org.example.podam.MyPodamDataProviderStrategy;
import org.example.podam.Person;
import org.testng.Assert;
import org.testng.annotations.Test;
import uk.co.jemos.podam.api.PodamFactory;
import uk.co.jemos.podam.api.PodamFactoryImpl;

@Test
public class TestPodamCustStrategy {
    @Test
    public void test_podam_cust_strategy() {
        PodamFactory factory = new PodamFactoryImpl();
        factory.setStrategy(new MyPodamDataProviderStrategy(2));
        Person expectedPerson = factory.manufacturePojo(Person.class);

        Person actualPerson = factory.manufacturePojo(Person.class);

        Assert.assertEquals(expectedPerson, actualPerson);
    }

}
