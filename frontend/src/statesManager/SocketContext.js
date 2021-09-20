import React, {createContext, useState, useRef, useEffect} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';
import { Redirect } from "react-router-dom";
import axios from 'axios';

const {REACT_APP_SERVER_URL} = process.env;

const SocketContext = createContext();

const socket = io(REACT_APP_SERVER_URL, {transports: ['websocket'], upgrade: false});

const SocketContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastData, setToastData] = useState({});
    const [pageLoaded, setpageLoaded] = useState(false);
    const [hasInternetConnection, setHasInternetConnection] = useState(true);
    const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
    const [chats, setChats] = useState({});
    const [chatsFilter, setChatsFilter] = useState({});
    const [searchInProgress, setSearchInProgress] = useState(false);
    const [activeChat, setActiveChat] = useState({});
    const [onlineUsersId, setOnlineUsersId] = useState([]);

    const toastHandler = (toast) => {
        setToastData(toast);
        setShowToast(true);
    }

    const removeToken = () => {
        localStorage.removeItem("token");
        setAuthToken('');
    }

    const internetConnectionChecker = () => {
        window.addEventListener('offline', function(e) {
            const toast = { type: 'error', message: "You're offline, try connecting back to the internet", duration: 10000 };
            toastHandler(toast);
            setHasInternetConnection(false);
        });
    };

    
    useEffect(() => {
        //if there's token, try validating it
        if(authToken){
            socket.emit('authenticateUser', authToken);
        }
        
        socket.on('user', async (data) => {
            console.log('22222', data)
            const {message, success, user, token, authVerified, chats} = data;
            let toast;
            if(success){
                setUser(user);
                setChats(chats);
                setpageLoaded(true);// Since user is authenticated
                if(!authVerified){ //only come in when validating token
                    localStorage.setItem("token", token);
                    setAuthToken(token)
                }

                //setup axios defaults for subsequent requests
                axios.defaults.baseURL = REACT_APP_SERVER_URL;
                axios.defaults.headers.common['x-auth-token'] = token;
                axios.defaults.headers.post['Content-Type'] = 'application/json';
            } else {
                if(authToken){
                    removeToken();
                    window.location = '/';
                }
                toast = { type: 'error', message, duration: 6000 };
                toastHandler(toast);
            }
        });

        socket.on('onlineUserId', async (userId) => {
            // console.log('onnnnnnnnnnn', userId)
        });

        socket.on('offlineUserId', async (userId) => {
            // console.log('offffffffffff', userId)
        });

        socket.on('allOnlineUsersId', async (usersId) => {
            // console.log('00000000000', usersId)
            setOnlineUsersId(usersId);
        });
    }, []);

    const setupUser = ({username, password}) => {
        internetConnectionChecker();
        hasInternetConnection && socket.emit('login', {username, password});
    }

    const searchThroughChats = async (search) => {
        if(!search){
            setSearchInProgress(false);
            return setChatsFilter({});
        }
        setSearchInProgress(true);
        const {data} = await axios.get(`/api/v1/chats?search=${search}`);
        setSearchInProgress(false);
        setChatsFilter(data);
        console.log(data);
    }

    const switchActiveChat = async (otherUser) => {
        setActiveChat(otherUser);
    }

    const getUserFromDb = async (option) => {
        const {username, id} = option;
        let user;
        if(username){
            const {data} = await axios.get(`/api/v1/user?username=${username}`);
            user = data?.otherUser;
        }

        if(id){
            const {data} = await axios.get(`/api/v1/user?id=${id}`);
            user = data?.otherUser;
        }
        return user;
    }

    return (
        <SocketContext.Provider value={{
            setupUser,
            user,
            showToast,
            setShowToast,
            toastData,
            authToken,
            pageLoaded,
            hasInternetConnection,
            removeToken,
            chats,
            chatsFilter,
            searchThroughChats,
            activeChat,
            switchActiveChat,
            searchInProgress,
            onlineUsersId,
            getUserFromDb
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketContextProvider, SocketContext}