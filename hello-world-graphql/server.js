// Importing Dependencies
var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

// Initializing Express to App
var app = express();

// Defining the Schema
var schema = buildSchema(`
  type Query{

  }
`);

// Defining Graphql Schema
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

// Listening on the port
app.listen(4000, () => console.log("Server Open at 4000"));
