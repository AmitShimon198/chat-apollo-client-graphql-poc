const UserModel = require('../db/schema/user')
const MessageModel = require('../db/schema/message')
module.exports = {
    Query: {
        usersGet,
        login,
        messagesGet,
    },
    Mutation: {
        register,
        sendMessage,
    }
};
async function register(_, args) {
    return (await UserModel.create(args)).toObject();
}
async function usersGet() {
    return await UserModel.find().lean();
}
async function login(_, args) {
    const token = 'sdvsdvsdvew-';
    const user = await UserModel.findOne(args).lean();
    return {
        ...user,
        createAt: user.createdAt.toISOString(),
        token: token + user.username
    };
}
async function sendMessage(parent, args, { user }) {
    const { to } = args;
    const toDb = await UserModel.findOne({ _id: to }).lean();
    if (toDb?._id) {
        const message = await MessageModel.create({ ...args, from: user?._id });
        return mapMessage(message);
    }
    return null;
}
async function messagesGet(parent, args, { user }) {
    debugger
    const toDb = await UserModel.findOne({ _id: args.from }).lean();
    if (toDb?._id) {
        const messages = await MessageModel.find({ from: toDb?._id, to: user?._id });
        return messages.map(mapMessage);
    }
    return null;
}

const mapMessage = (message) => ({
    ...message,
    id: message._id,
    createAt: message.createAt.toISOString()
})
