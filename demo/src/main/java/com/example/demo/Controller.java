package com.example.demo;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.apache.jena.fuseki.main.FusekiServer;
import org.apache.jena.ontology.OntModel;
import org.apache.jena.ontology.OntModelSpec;
import org.apache.jena.query.Dataset;
import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.QuerySolutionMap;
import org.apache.jena.query.ResultSet;
import org.apache.jena.query.ResultSetFormatter;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.riot.RDFDataMgr;
import org.apache.jena.tdb.TDBFactory;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class Controller {

    @GetMapping("/")
    public String hello() {

        Dataset ds = TDBFactory.createDataset(System.getProperty("user.dir") + "/goal.owl");
        ;

        FusekiServer server = FusekiServer.create()
                .add("/ds", ds)
                .build();
        server.start();
        System.err.println("CIAO");

        return "Hello World";
    }

    @GetMapping("/owl")
    public String owl() {

        String doc = "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>. "
                + "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. "
                + "@prefix xsd: <http://www.w3.org/2001/XMLSchema#>. "
                + "@prefix owl: <http://www.w3.org/2002/07/owl#>. "
                + "@prefix : <NS>. "
                + ":A a owl:Class. ";
        OntModel m = ModelFactory.createOntologyModel(OntModelSpec.OWL_MEM, null);
        m.read(new StringReader(doc), "NS", "N3");
        System.err.println(doc);

        return "Fatto";
    }

    @PostMapping("/query")
    public String receiveQuery(@RequestBody String query)
            throws UnsupportedEncodingException, FileNotFoundException {

        query = query.substring(0, query.length() - 1);
        String result = java.net.URLDecoder.decode(query, StandardCharsets.UTF_8.name());
        OntModel m = getModel();
        loadData(m);
        return showQuery(m, result);

    }

    // @GetMapping("/query")
    // public String test() {

    // FileManager.getInternal().addLocatorClassLoader(Main.class.getClassLoader());

    // FileManager.getInternal().loadModelInternal(System.getProperty("user.dir") +
    // "/goal.owl");
    // // String path ="http://purl.oclc.org/NET/UNIS/fiware/iot-lite#";
    // String path = "https://dev.nemo.inf.ufes.br/seon/SEON.owl";
    // Model model = ModelFactory.createOntologyModel(OntModelSpec.OWL_DL_MEM);
    // model.read(path);
    // model.write(System.out);
    // String queryString = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> "
    // +

    // "SELECT ?subject ?object " +
    // "WHERE { ?subject rdfs:subClassOf ?object } . ";

    // Query query = QueryFactory.create(queryString);
    // QueryExecution qexec = QueryExecutionFactory.create(query, model);
    // try {
    // ResultSet results = qexec.execSelect();
    // while (results.hasNext()) {
    // QuerySolution soln = results.nextSolution();
    // Literal name = soln.getLiteral("subject");
    // System.out.println(name);
    // }
    // } finally {
    // qexec.close();
    // }

    // return "Query done";
    // }

    public static final String SOURCE = "./demo/src/main/resources/";

    @GetMapping("/sparql")
    public void run() throws FileNotFoundException {
        OntModel m = getModel();
        loadData(m);
        String prefix = "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
                "PREFIX base: <https://dev.nemo.inf.ufes.br/seon/dev.nemo.inf.ufes.br/seon/dev.nemo.inf.ufes.br/seon/SEON.owl#>";

        showQuery(m,
                prefix +
                // "SELECT * WHERE {base:lightsOn base:isRealizedBy ?devices . ?devices base:id
                // ?id . ?devices base:consumption ?consumption . ?devices base:isLocatedAt
                // base:lab01 . }"

                        "SELECT DISTINCT ?devices ?id ?consume  WHERE {base:increaseTemperature base:isRealizedBy ?devices . ?devices base:id ?id . ?devices base:consumption ?consume . }"

        );
    }

    protected OntModel getModel() {
        return ModelFactory.createOntologyModel(OntModelSpec.OWL_MEM);
    }

    protected void loadData(Model m) {
        RDFDataMgr.read(m, SOURCE + "goal.owl");
    }

    private static void materialize(QuerySolution qs) {
        for (Iterator<String> iter = qs.varNames(); iter.hasNext();) {
            String vn = iter.next();
            RDFNode n = qs.get(vn);
            // System.out.println(n); // stampa ogni nodo
            // iter.forEachRemaining(t -> System.out.println(t));
        }
    }

    public void addAll(QuerySolution other) {
        Iterator<String> iter = other.varNames();
        for (; iter.hasNext();) {
            String vName = iter.next();
            RDFNode rdfNode = other.get(vName);
            // System.out.println(vName + " " + rdfNode); // var + value
            // map.add(vName, rdfNode);
            map.addAll(other);
        }
    }

    /**
     * Turn the result set into a java.util.List
     * 
     * @param resultSet The result set
     * @return List of QuerySolutions
     */
    static public List<QuerySolution> toList(ResultSet resultSet) {
        List<QuerySolution> list = new ArrayList<>();
        for (; resultSet.hasNext();) {
            QuerySolution result = resultSet.nextSolution();

            materialize(result);

            list.add(result);
        }
        return list;
    }

    QuerySolutionMap map = new QuerySolutionMap();

    // static public void outputAsJSON(ResultSet resultSet)
    // { ResultSetFormatter.outputAsJSON(JSONOutputStream.class, resultSet) ; }

    protected String showQuery(Model m, String q) throws FileNotFoundException {

        List<QuerySolution> pippo = new LinkedList<QuerySolution>();
        List<String> pippo1 = new LinkedList<String>();
        Query query = QueryFactory.create(q);
        QueryExecution qexec = QueryExecutionFactory.create(query, m);
        ResultSet results = qexec.execSelect();

        final OutputStream os = new FileOutputStream(SOURCE + "queryResults.json");
        // final PrintStream printStream = new PrintStream(os);

        // ObjectOutputStream objOut = new ObjectOutputStream(fileOut);
        ResultSetFormatter.outputAsJSON(os, results);

        return "done";
        // printStream.close();

        // devo sottrarre i link della ont, sennò il toString me li leva, oppure fare in
        // modo di stampare anche quello
        // results.forEachRemaining(t -> {System.out.println(t); map.addAll(t);});
        // System.out.println(map);
        // System.out.println(ResultSetFormatter.asText(results));
        // pippo = toList(results);
        // pippo1=getResourcesOfResultSet(pippo);
        // System.out.println(pippo1);
        // pippo.stream().forEach(t-> System.out.println(t)); //elementi ordinati per
        // righe
        // pippo1.stream().forEach(t->System.out.println(t));

        // results.forEachRemaining(t -> materialize(t));
        // results.getResultVars().iterator().forEachRemaining(t->
        // System.out.println(t));
        // results.forEachRemaining(t ->System.out.println(t.get("?id")));
        // results.forEachRemaining(t ->System.out.println(t.get("?devices")));
        // results.forEachRemaining(t ->System.out.println(t.get("?consume")));
        // t.varNames().forEachRemaining(d->System.out.println(d)));
        //

        // con var names stampa la determinata colonna della soluzione
        // con get possiamo prendere il valore di ogni colonna, mentre con il metodo
        // vecchio e più semplice stampa ogni riga
        // listProperties().forEach(d -> System.out.println(d)) );
        // results.forEachRemaining(t -> pippo.add(t));
        // pippo.forEach(t -> System.out.println(t.getResource("?consume ")));

        // ResultSetFormatter.out(results, m);

    }

    @GetMapping("/getResults")
    public Object getResults() throws IOException, ParseException {

        
          //JSON parser object to parse read file
          JSONParser jsonParser = new JSONParser();
         
         FileReader reader = new FileReader(SOURCE+"queryResults.json");
          
              //Read JSON file
              Object  obj = jsonParser.parse(reader);
            //  JSONArray employeeList = (JSONArray) obj;
            

              return obj;
   

    }

    // @GetMapping("/query")
    // public String test() {

    // FileManager.getInternal().addLocatorClassLoader(Main.class.getClassLoader());
    // // Model model =
    // // FileManager.getInternal().loadModelInternal(System.getProperty("user.dir")
    // +
    // // "/goal.owl");
    // String path =System.getProperty("user.dir") + "/goal.owl";
    // Model model = ModelFactory.createOntologyModel(OntModelSpec.OWL_DL_MEM);
    // model.read(path);
    // model.write(System.out);
    // String queryString = "PREFIX rdf:
    // <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
    // "PREFIX base:
    // <https://dev.nemo.inf.ufes.br/seon/dev.nemo.inf.ufes.br/seon/dev.nemo.inf.ufes.br/seon/SEON.owl#>"
    // +
    // "SELECT ?devices WHERE " +
    // "{?devices rdf:type base:Device .}";

    // Query query = QueryFactory.create(queryString);
    // QueryExecution qexec = QueryExecutionFactory.create(query, model);
    // try {
    // ResultSet results = qexec.execSelect();
    // while (results.hasNext()) {
    // QuerySolution soln = results.nextSolution();
    // Literal name = soln.getLiteral("devices");
    // System.out.println(name);
    // }
    // } finally {
    // qexec.close();
    // }

    // return "Query done";
    // }
}
