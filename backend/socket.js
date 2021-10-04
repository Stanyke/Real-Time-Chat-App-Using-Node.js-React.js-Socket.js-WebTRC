const { io } = require("./index");
const userService = require("./services/userServices");
const userServiceInstance = new userService();

let activeUsersId = [];

const logoutHandler = async (currentUserId, socket) => {
  let userIdExist = activeUsersId.includes(currentUserId.toString());
  if (userIdExist) {
    let uniqueActiveUsersId = activeUsersId.filter(
      (userId) => userId.toString() !== currentUserId.toString()
    );
    uniqueActiveUsersId = [...new Set(uniqueActiveUsersId)];
    activeUsersId = uniqueActiveUsersId;
    await userServiceInstance.updateUserLastSeen(currentUserId);
    const userData = await userServiceInstance.getUserById(currentUserId);
    socket.broadcast.emit("updatedUserData", userData);
    socket.broadcast.emit("offlineUserId", currentUserId);
    socket.emit("allOnlineUsersId", uniqueActiveUsersId);
    socket.broadcast.emit("allOnlineUsersId", uniqueActiveUsersId);
  }
};

io.on("connection", (socket) => {
  console.log("User just connected");
  let currentUserId;

  socket.on("login", async (data) => {
    const response = await userServiceInstance.userLogin(data);
    socket.emit("user", response.data);

    if (response.data.success) {
      currentUserId = response.data.user._id.toString();
      activeUsersId.push(currentUserId);
      let uniqueActiveUsersId = [...new Set(activeUsersId)];
      socket.broadcast.emit("onlineUserId", currentUserId);
      socket.emit("allOnlineUsersId", uniqueActiveUsersId);
      socket.broadcast.emit("allOnlineUsersId", uniqueActiveUsersId);
    }
  });

  socket.on("authenticateUser", async (token) => {
    const response = await userServiceInstance.verifyAuthToken(token);
    socket.emit("user", response.data);

    if (response.data.success) {
      currentUserId = response.data.user._id.toString();
      activeUsersId.push(currentUserId);
      let uniqueActiveUsersId = [...new Set(activeUsersId)];
      socket.broadcast.emit("onlineUserId", currentUserId);
      socket.emit("allOnlineUsersId", uniqueActiveUsersId);
      socket.broadcast.emit("allOnlineUsersId", uniqueActiveUsersId);
    }
  });

  socket.on("logoutUser", async (currentUserId) => {
    logoutHandler(currentUserId, socket);
  });

  socket.on("disconnect", async () => {
    if (currentUserId) {
      logoutHandler(currentUserId, socket);
    }
  });
});

module.exports = io;
