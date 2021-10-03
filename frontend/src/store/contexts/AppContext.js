import * as React from "react";
import axios from "axios";
import ACTIONS from "../actions";
import Peer from "simple-peer";
const {
  SET_CURRENT_USER,
  DATA_LOADED,
  SET_TOAST_DATA,
  SHOW_TOAST_DATA,
  LOGOUT_USER,
  HAS_INTERNET_CONNECTION,
  SET_USER_CHATS,
  SET_USER_TOKEN,
  SET_ONLINE_USERS_ID,
  FILTER_CHATS,
  SET_ACTIVE_CHAT,
} = ACTIONS;

const { REACT_APP_SERVER_URL } = process.env;

export const AppContext = React.createContext();

function useApp() {
  const context = React.useContext(AppContext);

  const [appState, dispatch] = context;

  const { socket, authToken, hasInternetConnection } = appState;

  const pageLoaderhandler = (status) => {
    dispatch({
      type: DATA_LOADED,
      payload: status,
    });
  };

  const toastHandler = (toast, status) => {
    dispatch({
      type: SET_TOAST_DATA,
      payload: toast,
    });
    dispatch({
      type: SHOW_TOAST_DATA,
      payload: status,
    });
  };

  const removeToken = () => {
    dispatch({
      type: LOGOUT_USER,
    });
  };

  const internetConnectionChecker = () => {
    window.addEventListener("offline", function (e) {
      const toast = {
        type: "error",
        message: "You're offline, try connecting back to the internet",
        duration: 10000,
      };
      toastHandler(toast, true);
      dispatch({
        type: HAS_INTERNET_CONNECTION,
        payload: false,
      });
    });
  };

  React.useEffect(() => {
    //if there's token, try validating it
    if (authToken) {
      socket.emit("authenticateUser", authToken);
    }

    socket.off('user').on("user", async (data) => {
      const { message, success, user, token, authVerified, chats } = data;
      let toast;
      if (success) {
        dispatch({
          type: SET_CURRENT_USER,
          payload: user,
        });
        dispatch({
          type: SET_USER_CHATS,
          payload: chats,
        });
        pageLoaderhandler(true)

        if (!authVerified) {
          //only come in when validating token
          dispatch({
            type: SET_USER_TOKEN,
            payload: token,
          });
        }

        //setup axios defaults for subsequent requests
        axios.defaults.baseURL = REACT_APP_SERVER_URL;
        axios.defaults.headers.common["x-auth-token"] = token;
        axios.defaults.headers.post["Content-Type"] = "application/json";
      } else {
        pageLoaderhandler(true)
        if (authToken) {
          removeToken();
          window.location = "/";
        }
        toast = { type: "error", message, duration: 6000 };
        toastHandler(toast);
      }
    });

    socket.off("onlineUserId").on("onlineUserId", async (userId) => {
      // console.log('onnnnnnnnnnn', userId)
    });

    socket.off("offlineUserId").on("offlineUserId", async (userId) => {
      // console.log('offffffffffff', userId)
    });

    socket.off("allOnlineUsersId").on("allOnlineUsersId", async (usersId) => {
      // console.log('00000000000', usersId)
      dispatch({
        type: SET_ONLINE_USERS_ID,
        payload: usersId,
      });
    });
  }, []);

  const setupUser = ({ username, password }) => {
    internetConnectionChecker();
    hasInternetConnection && socket.emit("login", { username, password });
  };

  const searchThroughChats = async (search) => {
    if (!search) {
      dispatch({
        type: FILTER_CHATS,
        payload: {
          chats: {},
          searchInProgress: false,
        },
      });
    } else {
      dispatch({
        type: FILTER_CHATS,
        payload: {
          chats: {},
          searchInProgress: true,
        },
      });
      const { data } = await axios.get(`/api/v1/chats?search=${search}`);
      dispatch({
        type: FILTER_CHATS,
        payload: {
          chats: data,
          searchInProgress: false,
        },
      });
      console.log(data);
    }
  };

  const switchActiveChat = async (otherUser) => {
    dispatch({
      type: SET_ACTIVE_CHAT,
      payload: otherUser,
    });
  };

  const getUserFromDb = async (option) => {
    const { username, id } = option;
    let user;
    if (username) {
      const { data } = await axios.get(`/api/v1/user?username=${username}`);
      user = data?.otherUser;
    }

    if (id) {
      const { data } = await axios.get(`/api/v1/user?id=${id}`);
      user = data?.otherUser;
    }
    return user;
  };

  return {
    appState,
    dispatch,
    setupUser,
    removeToken,
    searchThroughChats,
    switchActiveChat,
    getUserFromDb,
    toastHandler,
  };
}

export default useApp;
