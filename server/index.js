const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectToDatabase = require("./config/database");
const errorHandler = require("./middleware/error");
const User = require("./models/User");
const Message = require("./models/Message");

// Load env
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectToDatabase();

//Importing routes
const messages = require("./routes/messages");
const users = require("./routes/users");

const app = express();

// Setting Body parser
app.use(express.json());

// Show logs in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable CORS
app.use(cors());

// Setting base api to relevant routes
app.use("/api/v1/users", users);
app.use("/api/v1/messages", messages);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

let io = require("./socket").init(server);

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.io = io;

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("getAllMessages", async (user_id) => {
    const messages = await Message.find({ user: { $in: [user_id] } }).sort({
      createdAt: -1,
    });
    return socket.emit("getAllMessages", messages);
  });

  socket.on("getAllUsers", async (searchQuery) => {
    const username = new RegExp(searchQuery, "i");
    const users = await User.find({ username });
    socket.emit("getAllUsers", users);
  });

  socket.on("create_message", async (messageInfo) => {
    const FoundUser = await User.findById(messageInfo?.user);
    if (!FoundUser) {
      return socket.emit("create_message_error", true);
    }
    await Message.create(messageInfo);
    socket.emit("created_success", true);
  });

  socket.on("showSentMessages", async (username, from) => {
    let user = await User.findOne({ username }).populate("message");

    if (user?.message) {
      user.message = user.message
        ?.filter((data) => data.from === from)
        .sort((a, b) => b.createdAt - a.createdAt);
    }

    socket.emit("showSentMessages", user);
  });
});
