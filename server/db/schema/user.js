const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    imageUrl: { type: String },

}, { timestamps: true });

const UserModel = model('User', userSchema);

module.exports = UserModel;