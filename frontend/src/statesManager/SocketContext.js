import React, {createContext, useState, useRef, useEffect} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';
import { Redirect } from "react-router-dom";

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
                toast = { type: 'success', message, duration: 6000 };
                setUser(user);
                setChats(chats);
                setpageLoaded(true);// Since user is authenticated
                if(!authVerified){ //only come in when validating token
                    localStorage.setItem("token", token);
                    setAuthToken(token)
                }
            } else {
                if(authToken){
                    removeToken();
                    window.location = '/';
                }
                toast = { type: 'error', message, duration: 6000 };
            }
            toastHandler(toast);
        });
    }, []);

    const setupUser = ({username, password}) => {
        internetConnectionChecker();
        hasInternetConnection && socket.emit('login', {username, password});
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
            chats
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketContextProvider, SocketContext}