const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();
const connectToMongo = require("./config/db");
const { port, clientBaseUrl } = require("./config/constants");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { handleChat } = require("./socketHandlers");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: clientBaseUrl,
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: clientBaseUrl,
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket");
  handleChat(io, socket);
});
connectToMongo();
