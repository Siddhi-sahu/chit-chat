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
    messages: string[]
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
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<string[]>([])


    //implementation of sending a messsage

    const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
        console.log("Send Message", msg);
        if (socket) {
            socket.emit("event:message", { message: msg })
        }
    }, [socket]);

    const onMessageRec = useCallback((msg: string) => {
        console.log("From server message recieved", msg);
        const { message } = JSON.parse(msg) as { message: string };
        setMessages((prev) => [...prev, message]);
    }, []);

    useEffect(() => {
        const _socket = io("http://localhost:8000");
        _socket.on("message", onMessageRec)
        setSocket(_socket);

        return () => {
            _socket.disconnect();
            _socket.off("message", onMessageRec);
            setSocket(undefined)

        }
    }, [])
    return <SocketContext.Provider value={{ sendMessage, messages }}>
        {children}

    </SocketContext.Provider>

}