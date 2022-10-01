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
        messageSend,
    }
};
async function register(_, args) {
    return (await UserModel.create(args)).toObject();
}
async function usersGet() {
    const users = await UserModel.find().lean();
    let mapUsers = []
    for (let index = 0; index < users.length; index++) {
        const user = users[index];
        const mUser = mapUser(user)
        const message = await MessageModel.findOne({
            $or: [
                { from: user._id },
                { to: user._id }
            ]
        })
        if (message?._id) { mapUsers.push({ ...mUser, latestMessage: mapMessage(message.toObject()) }) } else {
            mapUsers.push({ ...mUser })
        }

    }
    return mapUsers;
}
async function login(_, args) {
    const token = 'sdvsdvsdvew-';
    const user = await UserModel.findOne(args).lean();
    return { ...mapUser(user), token: token + user.username };
}
function mapUser(user) {
    return {
        ...user,
        id: user._id.toString(),
        createdAt: user.createdAt.toISOString(),
    };
}

async function messageSend(parent, args, { user }) {
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
    createdAt: message.createdAt.toISOString()
})
