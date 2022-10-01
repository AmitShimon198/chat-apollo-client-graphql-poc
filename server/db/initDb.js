const mongoose = require("mongoose");
const connect = async (connectionString) => {
    if (connectionString) {
        await mongoose.connect(connectionString);
        return mongoose.connection;
    }
    return null;
}

module.exports = {
    connect
}