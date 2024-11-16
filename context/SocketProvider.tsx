"use client"



import { useSession } from "next-auth/react";
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

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const { data: session } = useSession()
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<string[]>([])


    //implementation of sending a messsage

    const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
        if (!session?.user?.id) {
            console.error("unauthenticated user: ");
            return
        }
        const userId = session.user.id;
        console.log("Send Message", msg, userId);
        if (socket) {
            socket.emit("event:message", { message: msg, userId })
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