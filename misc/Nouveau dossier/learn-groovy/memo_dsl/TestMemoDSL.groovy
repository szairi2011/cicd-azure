// package memo_dsl

// import memo_dsl.MemoDSL

class MemoDslTestCase extends GroovyTestCase {
    
    void testDSL_should_output_xml() {
        
        MemoDSL.create {
            to "sofien.zair@fisglobal.com"
            from "adam.zairi@home.com"
            title "Buying groceries from Supermarket"
            body "We need to go to the supermarket for the weekly groceries list ..."
            transport "Using the car"
            idea "Make it early"
            xml
        }
    }
}