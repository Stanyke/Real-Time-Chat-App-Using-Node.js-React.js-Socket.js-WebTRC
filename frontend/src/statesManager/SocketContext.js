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
    const authToken = localStorage.getItem("token");
    
    useEffect(() => {
        //if there's token, try validating it
        if(authToken){
            socket.emit('authenticateUser', authToken);
        }
        
        socket.on('user', async (data) => {
            console.log('22222', data)
            const {message, success, user, token, authVerified} = data;
            let toast;
            if(success){
                toast = { type: 'success', message, duration: 6000 };
                setUser(user);
                setpageLoaded(true);// Since user is authenticated
                if(!authVerified){ //only come in when validating token
                    localStorage.setItem("token", token);
                }
            } else {
                if(authToken){
                    localStorage.removeItem("token");
                }
                toast = { type: 'error', message, duration: 6000 };
            }
            setToastData(toast);
            setShowToast(true);
        });
    }, []);

    const setupUser = ({username, password}) => {
        socket.emit('login', {username, password});
    }

    return (
        <SocketContext.Provider value={{
            setupUser,
            user,
            showToast,
            setShowToast,
            toastData,
            authToken,
            pageLoaded
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketContextProvider, SocketContext}