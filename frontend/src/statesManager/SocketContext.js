import React, {createContext, useState, useRef, useEffect} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

const {REACT_APP_SERVER_URL} = process.env;

const SocketContext = createContext();

const socket = io(REACT_APP_SERVER_URL, {transports: ['websocket'], upgrade: false});

const SocketContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastData, setToastData] = useState({});
    
    useEffect(() => {
        socket.on('user', async (data) => {
            const {message, success, user, token} = data;
            let toast;
            if(success){
                toast = { type: 'success', message, duration: 6000 };
            } else {
                toast = { type: 'error', message, duration: 6000 };
            }
            setToastData(toast);
            setShowToast(true);
        })
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
            toastData
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketContextProvider, SocketContext}