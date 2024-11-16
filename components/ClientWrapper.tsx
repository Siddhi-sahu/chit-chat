"use client"

import { SocketProvider } from "@/context/SocketProvider"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface ClientWrapperProps {
    children: ReactNode;
}
const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
    return (
        <SessionProvider>
            <SocketProvider>
                {children}
            </SocketProvider>
        </SessionProvider>
    )
}

export default ClientWrapper;