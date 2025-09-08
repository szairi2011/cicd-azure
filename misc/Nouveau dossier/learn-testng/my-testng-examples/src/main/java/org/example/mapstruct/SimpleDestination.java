package org.example.mapstruct;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
public class SimpleDestination {
    private String name;
//    @Getter
//    @Setter
//    @ToString.Include
//    private static String description; MapStruct does not map static fields
    private String description;
    private String destinationAddress;
    private DestinationDivision division;
    private DestinationStaticEntity staticEntity;

    @Data
    public static class DestinationStaticEntity {
        private String name;
    }



}
