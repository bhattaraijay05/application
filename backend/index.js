const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

// io.on("connection", (socket) => {
//   var defaultRoom = "general";
//   var rooms = [
//     "General",
//     "angular",
//     "socket.io",
//     "express",
//     "node",
//     "mongo",
//     "PHP",
//     "laravel",
//   ];

//   socket.emit("setup", {
//     rooms: rooms,
//   });

//   socket.on("new user", function (data) {
//     data.room = defaultRoom;
//     socket.join(defaultRoom);
//     io.in(defaultRoom).emit("user joined", data);
//   });

//   console.log("Client is added");

//   socket.on("setchat", (msg) => {
//     io.emit("getchat", msg);
//   });

//   socket.on("endcall", () => {
//     console.log("Client is disconnected");
//     socket.disconnect(true);
//   });
// });

io.on("connection", (socket) => {
  socket.username = socket.id;

  socket.on("setchat", (msg) => {
    io.emit("getchat", msg);
  });

  socket.emit("notify user", socket.username);
  socket.broadcast.emit("user connected", socket.username);

  // disconnect event
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.username);
  });

  // chat message event
  socket.on("chat message", (params) => {
    let timestamp = new Date().toISOString();

    io.emit("chat message", {
      nickname: socket.username,
      message: params.message,
      time: timestamp,
    });
  });

  // user typing event
  socket.on("user typing", (isTyping) => {
    if (isTyping === true) {
      socket.broadcast.emit("user typing", {
        nickname: socket.username,
        isTyping: true,
      });
    } else {
      socket.broadcast.emit("user typing", {
        nickname: socket.username,
        isTyping: false,
      });
    }
  });
});

server.listen(port, () => console.log(`Server is running in port ${port}`));
