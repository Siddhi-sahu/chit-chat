"use client"
import { stat } from "fs";
//simplest way possible
import React, { useCallback, useContext, useEffect } from "react"
import { io } from "socket.io-client"

interface SocketProviderProps {
    children?: React.ReactNode
}

//structure
interface ISocketContext {
    //gives us a msg of type string and return us anything
    sendMessage: (msg: string) => any;
}
const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) {
        throw new Error(`state is undefined`)
    };
    return state
}

export const SockerProvider: React.FC<SocketProviderProps> = ({ children }) => {
    //implementation of sending a messsage

    const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
        console.log("Send Message", msg);
    }, []);

    useEffect(() => {
        const _socket = io("http://localhost:8000")

        return () => {
            _socket.disconnect()

        }
    }, [])
    return <SocketContext.Provider value={{ sendMessage }}>
        {children}

    </SocketContext.Provider>

}