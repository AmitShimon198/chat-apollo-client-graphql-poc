const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typeDef')
const resolvers = require('./graphql/resolvers');
const { connect } = require('./db/initDb');
const UserModel = require('./db/schema/user');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx) => {
        if (ctx?.req?.headers?.authorization) {
            const user = await UserModel.findOne({ username: ctx.req.headers.authorization.split('-')[1] }).lean();
            ctx.user = user;
        }
        return ctx;
    }
});

server.listen().then(async ({ url }) => {
    await connect('mongodb://0.0.0.0:27017/chatApp')
    console.log(`🚀 Server ready at ${url}`);
});