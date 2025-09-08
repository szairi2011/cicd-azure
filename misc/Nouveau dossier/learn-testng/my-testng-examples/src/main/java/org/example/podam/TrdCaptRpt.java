package org.example.podam;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@ToString
@Getter
@Setter
public class TrdCaptRpt {


    public static Hdr hdr;

    @ToString
    @Getter
    @Setter
    public static class Hdr {
        protected String nestedField2;
        String nestedField3;
    }
}
