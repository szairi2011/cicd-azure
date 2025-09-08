
import groovy.transform.Field;
import groovy.xml.MarkupBuilder;
// import groovy.util.XMLParser;

def a = ['apple', 'pear', 'orange']

for (elt : a) {
    println(elt)
}

a.each { item -> println item + 's' };

try {
    println a[5]
}
catch (Exception e) {
    e.printStackTrace()
}

// Build in i/o

def file = new File('C:/')
/* groovylint-disable-next-line UnnecessaryGetter */
println("Directory? ${file.isDirectory()}")

/* groovylint-disable-next-line JavaIoPackageAccess, NoDef, VariableTypeRequired */
def file2 = new File('./test_project/Example.class')
println(file2.text)

// Buil in Date class
def today = new Date()
println today

// Closures

Closure clos = { println "I'm a string in a closure ..." };
clos.call()

def clos2 = {
    param1, param2 -> {
        println "I'm a string ${param1} in a parameterised closure ..."
        println "another string ${param2} inside the parmetried closure"
    }
};
clos2.call('Hello ...', 'Hi ...')

@Field
List vehicules = ['Car', 'Plane', 'Ship', 'Bus']
vehicules.each { println it };
def bus = vehicules.find { it.equals('Bus') };
println bus

void methodA(clos) {
    x = vehicules.find clos
    println x
}

def clos3 = { it.contains('P') };
methodA clos3

// Handle XML and markup natively

//Let's build the xml markup document and save to file system the Groovy way

new File("movies.xml").withWriter {
    writer -> 
    def mb = new MarkupBuilder(writer);
    mb.collection('title': 'New Arrivals') {
        mb.movie('name': 'Zetopia') {
            mb.title('Zetopia the animal land')
            mb.description('3D animation movie')
        }
    };
};
    

// Then we parse it and display builder nodes
def xml = new XmlParser();
mb2 = xml.parse('movies.xml');
mb2.movie.each {
    // movie -> 
    println "Movie name: ${it['@name']}"
    println "Movie title: ${it.title[0].text()}"
    println "Movie description: ${it.description[0].text()}"
}

// Setting JMX monitoring for a JVM instance, case of Tomcat runtime -- Check jmx_client.groovy

// Builders
def nodeBuilder = new groovy.json.JsonBuilder() 

def studentlist = nodeBuilder..students {
   student {
      studentname 'Joe'
      studentid '1'
        
      Marks(
         Subject1: 10,
         Subject2: 20,
         Subject3:30,
      )
   } 
} 

println(studentlist)