package org.example.podam;

import lombok.Data;
import uk.co.jemos.podam.common.PodamStrategyValue;

@Data
public class Address {
    @PodamStrategyValue(value = MyPostCodeStrategy.class)
    String name;
    String adddress;

}
