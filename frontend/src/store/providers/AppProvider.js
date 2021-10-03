import * as React from 'react';
import appReducer from '../reducers/AppReducer.js';
import { AppContext } from '../contexts/AppContext.js';
import {io} from 'socket.io-client';
const {REACT_APP_SERVER_URL} = process.env;

function AppProvider({children}) {

  const [state, dispatch] = React.useReducer(appReducer, { 
    user: {},
    toastData: {},
    showToast: false,
    isLoading: false,
    hasInternetConnection: true,
    authToken: localStorage.getItem("token"),
    chats: {},
    chatsFilter: {},
    searchInProgress: false,
    activeChat: {},
    onlineUsersId: [],
    socket: io(REACT_APP_SERVER_URL, {transports: ['websocket'], upgrade: false})
  });
  
  const value = [state, dispatch];

  return (
    <AppContext.Provider value={ value }>
      { children }
    </AppContext.Provider>
  )
}

export default AppProvider;