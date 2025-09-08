package org.example;

public class EnumExample {
    public static void main(String[] args) {
//        Predicate isNewTrade = () -> TradeTypeEnum.NEW_EXECUTED_TRADE.name() == ;
        TradeTypeEnum name = TradeTypeEnum.valueOf();
        String simpleName = TradeTypeEnum.NEW_EXECUTED_TRADE.name();
        String value = TradeTypeEnum.NEW_EXECUTED_TRADE.toString();

        System.out.println(name + " " + simpleName + " " + value);
    }

    private static enum TradeTypeEnum {
        NEW_EXECUTED_TRADE("0"), NEW_GIVEIN_TRADE("1");

        private final String type;

        TradeTypeEnum(String type) {
            this.type = type;
        }

        public static TradeTypeEnum valueOf() {
            return valueOf("NEW_EXECUTED_TRADE");
        }

        @Override
        public String toString() {
            return type;
        }
    }
}
