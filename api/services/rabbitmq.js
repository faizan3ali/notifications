const amqp = require("amqplib");
const notifications = require("../controller/notifications")
const mongoose = require("mongoose");

/**
 * connectQueue
 *
 *connection to the main server
 */
var connection, channel;
exports.connectQueue = async () => {
    try {

        const amqpServer = process.env.RabbitMQ_URL || "amqp://127.0.0.1";

        //const amqpServer = process.env.RabbitMQ_URL || "amqp://172.17.0.2";
        console.log("Rabbit Mq Url :", amqpServer)
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel()

        await channel.assertQueue("notifications")

        channel.consume("notifications", data => {
            let message = `${Buffer.from(data.content)}`
            channel.ack(data);//acknowledge the main server
            message = JSON.parse(data.content);
            const dbName = message.database;
            const mongoUri = `mongodb://admin:admin1234@localhost:27017/${dbName}`;
            const mongooseConn = mongoose.createConnection(mongoUri);
            switch (message.category) {
                case "task":
                    notifications.addTaskNotifications(message, mongooseConn)
                    break;
                case "timesheets":
                    notifications.addTimesheetSubmittedkNotifications(message, mongooseConn)
                    break;
                case "SignUp":
                    notifications.addNewSignUpUserNotification(message, mongooseConn)
                    break;
                default:
                    break;
            }

        })
    } catch (error) {
        console.log(error);
    }
}
