package org.example.mapstruct;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SimpleSourceDestinationMapper {

    SimpleSourceDestinationMapper INSTANCE = Mappers.getMapper( SimpleSourceDestinationMapper.class );
//    @Mapping(source = "name", target = "name")
    @Mapping(source = "sourceAddress", target = "destinationAddress") // Need to specify mappings between fields of different names
    @Mapping(source = "description", target = "description")
//    @Mapping(source = "sourceDivision", target = "destinationDivision")
    SimpleDestination map(SimpleSource source);
    @Mapping(source = "destinationAddress", target = "sourceAddress")
    SimpleSource map(SimpleDestination destination);

    DestinationDivision divisionToDivision(SourceDivision division); // As long as explicit mapping method definition exists no need to specify @Mapping
    SourceDivision divisionToDivision(DestinationDivision division);

}
