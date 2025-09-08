package org.example.mapstruct;

public class Main {
    public static void main(String[] args) {

        SimpleSource source = new SimpleSource();
        source.setName("John");
        source.setDescription("Source description ...");
        source.setSourceAddress("34 Av. de la Terre");
        SourceDivision division = new SourceDivision();
        division.setName("Source name ...");
        source.setDivision(division);

        SimpleSource.SourceStaticEntity sourceStatic = new SimpleSource.SourceStaticEntity();
        sourceStatic.setName("Name field for the source static entity");
        source.setStaticEntity(sourceStatic);

        SimpleDestination destination = SimpleSourceDestinationMapper.INSTANCE.map(source);
        System.out.println(destination);

        SimpleSource anotherSource = SimpleSourceDestinationMapper.INSTANCE.map(destination);
        System.out.println(anotherSource);
    }
}
