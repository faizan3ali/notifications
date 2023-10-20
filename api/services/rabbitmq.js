const amqp = require("amqplib");
const notifications = require("../controller/notifications")

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
            message = JSON.parse(data.content)
            console.log("message", message)
            switch (message.category) {
                case "task":
                    notifications.addTaskNotifications(message)
                    break;
                case "timesheets":
                    notifications.addTimesheetSubmittedkNotifications(message)
                    break;
                case "SignUp":
                    notifications.addNewSignUpUserNotification(message)
                    break;
                case "CronJob":
                      notifications.createNotification(message)
                      break;
                default:
                    break;
            }

        })
    } catch (error) {
        console.log(error);
    }
}
