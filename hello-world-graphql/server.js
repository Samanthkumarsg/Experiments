const { ApolloServer } = require("apollo-server");

// The GraphQL schema
const typeDefs = require("./graphql/typedef");
const resolvers = require("./graphql/resolver");

// Defining the Typedef and Resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Listening on the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
