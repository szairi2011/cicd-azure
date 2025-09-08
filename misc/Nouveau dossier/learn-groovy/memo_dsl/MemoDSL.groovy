// package memo_dsl;

import groovy.xml.MarkupBuilder;

class MemoDSL {
    
    String fromText
    String toText
    String titleText
    String body
    List sections = []

    static create(Closure closure) {
        MemoDSL memoDsl = new MemoDSL()
        closure.delegate = memoDsl
        // closure.resolveStrategy = Closure.DELEGATE_FIRST
        closure() 
    }

    /* groovylint-disable-next-line NglParseError */
    void from(String fromText) {
        this.fromText = fromText
        println "Hello from dsl from method ..."
    }

    void to(String toText) {
        this.toText = toText
        println "Hello from dsl to method ..."
    }

    void body(String bodyText) {
        this.body = bodyText
        println "Hello from dsl body method ..."
    }

    void title(String titleText) {
        this.titleText = titleText
        println "Hello from delegate title method ..."
    }

    def methodMissing(String methodName, args) {
        def section = new Section(title: methodName, body: args[0])
        this.sections << section
        println "Hello from methodMissing $methodName method ..."
    }

    def getXml() {
        doXml(this)
    }

    private static doXml(MemoDSL memoDsl) {
        def writer = new StringWriter()
        def xmlBuilder = new MarkupBuilder(writer)
        xmlBuilder.memo() {
            from(memoDsl.fromText)
            to(memoDsl.toText)
            title(memoDsl.titleText)
            body(memoDsl.body)
            for (s in memoDsl.sections) {
                // s.title(s.body)
                "$s.title"(s.body)
            }
        }

        println writer
        writer.toString()
    }
}

class Section {
    String title
    String body
}