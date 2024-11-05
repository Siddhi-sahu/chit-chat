"use client"

import React, { useCallback } from "react"

interface SocketProviderProps {
    children?: React.ReactNode
}

//structure
interface ISocketContext {
    //gives us a msg of type string and return us anything
    sendMessage: (msg: string) => any;
}
const SocketContext = React.createContext<ISocketContext | null>(null);


export const SockerProvider: React.FC<SocketProviderProps> = ({ children }) => {
    //implementation of sending a messsage

    const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
        console.log("Send Message", msg);
    }, [])
    return <SocketContext.Provider value={{ sendMessage }}>
        {children}

    </SocketContext.Provider>

}