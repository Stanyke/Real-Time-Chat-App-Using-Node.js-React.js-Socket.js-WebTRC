import React, {createContext, useState, useRef, useEffect} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

const {REACT_APP_SERVER_URL} = process.env;

const SocketContext = createContext();

const socket = io(REACT_APP_SERVER_URL);

const ContextProvider = ({children}) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        
    }, []);

    const setupUser = ({username}) => {
        socket.emit('userLogin', {username});
        setUser({username});
    }

    return (
        <SocketContext.Provider value={{
            setupUser,
            user
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export {ContextProvider, SocketContext}