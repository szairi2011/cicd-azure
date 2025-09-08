package org.example.podam;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import uk.co.jemos.podam.common.EmailStrategy;
import uk.co.jemos.podam.common.PodamIntValue;
import uk.co.jemos.podam.common.PodamStrategyValue;

import javax.xml.datatype.XMLGregorianCalendar;
import java.util.GregorianCalendar;

//@Data
@ToString
@Getter
@Setter
public class Person {

    String firstname;
    String lastname;

    @PodamIntValue(minValue = 20, maxValue = 60)
    int age;
//    @PodamStrategyValue(value = EmailStrategy.class)
//    String email;

    //    @PodamStrategyValue(value = MyEmailStrategy.class)
    String email;

    String email2;

    @PodamStrategyValue(value = MyEmailStrategy.class, comment = "Return custom data for email3 ...")
    String email3;

    String email4; // This field will be initialized through the MyPodamDataProviderStrategy programmatically, and no annotations needed

    String postcode;

    Address address;

    Hdr hdr;

    TrdCaptRpt.Hdr trdCptRptHdr;

    //    @Data
    @ToString
    @Getter
    @Setter
    public static class Hdr {
        String name;
        String field2;
        String field3;
        String field4;
        String field5;
        String field6;
        XMLGregorianCalendar snt;
    }

//    @ToString
//    @Getter
//    @Setter
//    public static class TrdCptRpt {
//        @ToString
//        @Getter
//        @Setter
//        public static class Hdr {
//            String nestedField2;
//            String nestedField3;
//        }
//    }
}
