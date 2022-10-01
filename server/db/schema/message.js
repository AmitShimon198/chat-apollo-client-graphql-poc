const { model, Schema } = require("mongoose");

const messageSchema = new Schema({
    content: { type: String },
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const MessageModel = model('Message', messageSchema);

module.exports = MessageModel;