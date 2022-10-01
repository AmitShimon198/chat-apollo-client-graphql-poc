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
async function usersGet(parent, args, { user }) {
    const users = await UserModel.find().lean();
    let mapUsers = []
    for (let index = 0; index < users.length; index++) {
        const dbUser = users[index];
        if (dbUser._id.toString() === user._id.toString()) {
            continue;
        }
        const mUser = mapUser(dbUser)
        const message = await MessageModel.findOne({
            $or: [
                { from: dbUser._id },
                { to: dbUser._id }
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
        imageUrl: 'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
        id: user._id.toString(),
        createdAt: user.createdAt.toISOString(),
    };
}

async function messageSend(parent, args, { user }) {
    const { to } = args;
    const toDb = await UserModel.findOne({ _id: to }).lean();
    debugger
    if (toDb?._id) {
        const message = await MessageModel.create({ ...args, from: user?._id });
        return mapMessage(message.toObject());
    }
    return null;
}
async function messagesGet(parent, args, { user }) {
    const other = await UserModel.findOne({ _id: args.from }).lean();
    if (other?._id) {
        const messages = await MessageModel.find({
            $or: [
                { from: other._id.toString(), to: user._id.toString() },
                { to: other._id.toString(), from: user._id.toString() }
            ]
        }).lean();
        return messages.map(mapMessage);
    }
    return null;
}

const mapMessage = (message) => ({
    ...message,
    id: message._id,
    createdAt: message.createdAt.toISOString()
})
