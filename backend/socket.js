const { io } = require("./index");
const userService = require("./services/userServices");
const userServiceInstance = new userService();

const activeUsersId = [];

io.on("connection", (socket) => {
  console.log("User just connected");
  let currentUserId;

  socket.on("login", async (data) => {
    const response = await userServiceInstance.userLogin(data);
    socket.emit("user", response.data);
    
    if(response.data.success) {
        currentUserId = response.data.user._id.toString();
        activeUsersId.push(currentUserId);
        socket.broadcast.emit("onlineUserId", currentUserId);
        socket.broadcast.emit("allOnlineUsersId", activeUsersId);
    }
  });

  socket.on("authenticateUser", async (token) => {
    const response = await userServiceInstance.verifyAuthToken(token);
    socket.emit("user", response.data);

    if(response.data.success) {
        currentUserId = response.data.user._id.toString();
        activeUsersId.push(currentUserId);
        socket.broadcast.emit("onlineUserId", currentUserId);
        socket.broadcast.emit("allOnlineUsersId", activeUsersId);
    }
  });

  socket.on("disconnect", async () => {
    if(currentUserId){
      let remove_id = activeUsersId.indexOf(currentUserId.toString());
      if(remove_id > -1){
        activeUsersId.splice(remove_id, 1);
        socket.broadcast.emit("offlineUserId", currentUserId);
        socket.broadcast.emit("allOnlineUsersId", activeUsersId);
        await userServiceInstance.updateUserLastSeen(currentUserId);
      }
    }
  });
});

module.exports = io;
