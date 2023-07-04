const handleChat = (io, socket) => {
  let user;
  socket.on("setup", (userData) => {
    user = userData;
    console.log("handling setup", userData.userId);
    socket.join(userData.userId);
    socket.emit("connected");
  });

  socket.on("join_chat", (room) => {
    socket.join(room);
    console.log("user joined chat:", room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop_typing", (room) => socket.in(room).emit("stop_typing"));

  socket.on("new_message", (newMessageReceived) => {
    console.log("new message received ");
    if (!newMessageReceived?.chat?.users)
      return console.log("chat.users is not defined");
    else {
      newMessageReceived?.chat?.users.forEach((user) => {
        socket.in(user?._id).emit("receive_message", newMessageReceived);
      });
    }
  });

  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(user.userId);
  });
};

module.exports = { handleChat };
