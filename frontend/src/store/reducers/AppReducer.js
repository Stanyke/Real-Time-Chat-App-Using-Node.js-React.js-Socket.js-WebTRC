import ACTIONS from "../actions";
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
  SET_ACTIVE_CHAT
} = ACTIONS;

export default function appReducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };
    case DATA_LOADED:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_TOAST_DATA:
      return {
        ...state,
        toastData: action.payload,
      };
    case SHOW_TOAST_DATA:
      return {
        ...state,
        showToast: action.payload,
      };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        user: {},
        authToken: "",
      };
    case HAS_INTERNET_CONNECTION:
      return {
        ...state,
        hasInternetConnection: action.payload,
      };
    case SET_USER_CHATS:
      return {
        ...state,
        chats: action.payload,
      }
    case SET_USER_TOKEN:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        authToken: action.payload,
      }
    case SET_ONLINE_USERS_ID:
      return {
        ...state,
        onlineUsersId: action.payload,
      }
    case FILTER_CHATS:
      return {
        ...state,
        chatsFilter: action.payload.chats,
        searchInProgress: action.payload.searchInProgress,
      }
    case SET_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.payload,
      }
    default:
      return state;
  }
}
