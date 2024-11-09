"use client"


//simplest way possible
import React, { useCallback, useContext, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

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
    const [socket, setSocket] = useState<Socket>()


    //implementation of sending a messsage

    const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
        console.log("Send Message", msg);
        if (socket) {
            socket.emit("event:message", { message: msg })
        }
    }, [socket]);

    useEffect(() => {
        const _socket = io("http://localhost:8000");
        setSocket(_socket);

        return () => {
            _socket.disconnect()
            setSocket(undefined)

        }
    }, [])
    return <SocketContext.Provider value={{ sendMessage }}>
        {children}

    </SocketContext.Provider>

}