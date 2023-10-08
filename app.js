const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { connectDb } = require("./dbconnection"); // Import your connectDb function
const rabbitMQ = require("./api/services/rabbitmq");
const cors = require("cors");
const checkProjectEndDate = require("./api/cronJobs/projectEndDateChecker");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
  // Parse the Origin header to extract the subdomain
  const origin = req.get("Origin");
  if (origin) {
    const subdomainMatch = origin.match(/https?:\/\/([^.]+)\./);
    if (subdomainMatch && subdomainMatch[1]) {
      const subdomain = subdomainMatch[1];
      // Store the extracted subdomain in a variable accessible to other middleware and routes
      req.subdomain = subdomain;
    }
  }
  next();
});

app.use(async (req, res, next) => {
  try {
    const {subdomain} = req;
    let dbName = '';
    if(subdomain == 'butsch'){
      dbName = 'admin';
    }
    else{
      dbName = subdomain;
    }
    const connection = await connectDb(dbName, "mongodb://admin:admin1234@localhost:27017/");
    console.log("Connected to database for subdomain:", req.subdomain);
    req.database = connection; // Attach the connection to the request object
    next();
  } catch (error) {
    console.error(`Database connection error for subdomain ${req.subdomain}:`, error);
    next(error);
  }
});

app.use(cors());

checkProjectEndDate();



try {
  rabbitMQ.connectQueue(); // call the connect function
} catch (error) {
  console.log("connection error",error)
}


const http = require("http").createServer(app);

const port = process.env.PORT || 5002;

const io = require("socket.io")(http, {
  cors: {
    origins: "*",
  },
});


var sockets_buckets = [];
function getSocketBucketByUserID(user_id) {
  if (Array.isArray(sockets_buckets) && user_id) {
    var socket_bucket = sockets_buckets.find(function (socket_bucket) {
      return socket_bucket._id.toString() === user_id.toString();
    });
    return socket_bucket;
  } else {
    sockets_buckets = [];
  }
}

function getSocketBucketByUserID(user_id) {
  if (Array.isArray(sockets_buckets) && user_id) {
    var socket_bucket = sockets_buckets.find(function (socket_bucket) {
      return socket_bucket._id.toString() === user_id.toString();
    });
    return socket_bucket;
  } else {
    sockets_buckets = [];
  }
}

function getSocketBucketBySocketID(socket_id) {
  var socket_bucket = sockets_buckets.find(function (socket_bucket) {
    var index = socket_bucket.sockets.indexOf(socket_id);
    if (index > -1) {
      return true;
    }
  });
  return socket_bucket;
}

io.on("connection", (socket) => {
  // Disconnection of socket
  socket.on("disconnect", () => {
    sockets_buckets.find(function (socket_bucket) {
      var index = socket_bucket.sockets.indexOf(socket.id);
      if (index > -1) {
        socket_bucket.sockets.splice(index, 1);
        return true;
      }
    });
  });

  socket.on("register", (payload) => {

    var socketBucket = getSocketBucketByUserID(payload._id);
    if (!socketBucket) {
      socketBucket = {
        _id: payload._id,
        rooms: [],
        sockets: [socket.id],
      };
      sockets_buckets.push(socketBucket);
    } else {
      if (!Array.isArray(socketBucket.sockets)) {
        socketBucket.sockets = [];
      }
      socketBucket.sockets.push(socket.id);
    }
    console.log("user is connected",sockets_buckets)
  });
});

process.on("notification", async (payload) => {
  console.log("realetime",payload.user)
  var recipientSocket = getSocketBucketByUserID(payload.user);
  if (recipientSocket && Array.isArray(recipientSocket.sockets)) {
    recipientSocket.sockets.forEach((socket_id) => {
      io.to(socket_id).emit("notification", payload.notification);
    });
  }
});

http.listen(port, () => {
  console.log("listening on :" + port);
});
