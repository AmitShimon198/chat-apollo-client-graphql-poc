const { gql } = require("apollo-server");

module.exports = gql`
type User{
  id: String!
  username: String!
  email: String!
  token: String
  createdAt: String!
  latestMessage: Message
}
type Message{
  id: String!
  to: String!
  content:String!
  from:String!
  createdAt: String!
}
type Query {
    usersGet: [User]!
    login(username: String!, password: String!): User!
    messagesGet(from: String!): [Message]
}
type Mutation {
    register(username: String!, email: String!, password: String!, imageUrl:String): User!
    messageSend(content: String!, to: String!): Message
}
`;