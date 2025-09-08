package org.example.mapstruct;

import lombok.Data;

@Data
public class SimpleSource {
    private String name;
    private String description;
    private String sourceAddress;
    private SourceDivision division;
    private SourceStaticEntity staticEntity;

    @Data
    public static class SourceStaticEntity {
        private String name;
    }

}
