const { gql } = require("apollo-server");

const types = `
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

// The GraphQL schema
module.exports = gql(types);
