const { gql } = require("apollo-server");

module.exports = gql`
type User{
  id: String!
  username: String!
  email: String!
  token: String
  createAt: String!
}
type Message{
  id: String!
  to: String!
  content:String!
  from:String!
  createAt: String!
}
type Query {
    usersGet: [User]!
    login(username: String!, password: String!): User!
    messagesGet(from: String!): [Message]
}
type Mutation {
    register(username: String!, email: String!, password: String!, imageUrl:String): User!
    sendMessage(content: String!, to: String!): Message
}
`;