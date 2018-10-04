const { ApolloServer, gql } = require("apollo-server");

// The GraphQL schema
const typeDefs = gql`
  type Person {
    id: Int
    name: String
    lname: String
  }
  type Query {
    hello: String
    person(id: Int!): Person
  }
`;

var values = [
  { id: 1, name: "Velan", lname: "Salis" },
  { id: 2, name: "Vion", lname: "Salis" },
  { id: 3, name: "Mark", lname: "Salis" },
  { id: 4, name: "Flavia", lname: "Salis" },
  { id: 5, name: "Ashwath", lname: "Salis" },
  { id: 6, name: "Jeffrey", lname: "Salis" }
];

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
    person: (root, args, context, info) => {
      return values[args.id];
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
