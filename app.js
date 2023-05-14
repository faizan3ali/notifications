const express = require('express')
const app = express()
const mongoose = require("mongoose");
const connectDB = require('./dbconnection');
const amqp = require("amqplib");
var channel, connection;
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port {PORT}`));

connectQueue()  // call the connect function
 
async function connectQueue() {
    try {
        connection = await amqp.connect("amqp://127.0.0.1");
        channel    = await connection.createChannel()
        
        await channel.assertQueue("notifications")
        
        channel.consume("notifications", data => {
            console.log(`${Buffer.from(data.content)}`);
            channel.ack(data);
        })
    } catch (error) {
        console.log(error);
    }
}