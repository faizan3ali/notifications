// mongoose import
const mongoose = require('mongoose');
const Notifications = require("./api/models/notifications");

// Import other models as needed

// a function that takes database name and database url as import and return a mongoose connection
const connectDb = async (dbName, dbUrl) => {
    if (dbName === mongoose.connection?.client?.s.options.dbName) return mongoose;

    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection.useDb(dbName);
        } else {
            await mongoose.connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log(`Connected to ${dbUrl}`);
            return mongoose.connection.useDb(dbName);
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = { connectDb };
