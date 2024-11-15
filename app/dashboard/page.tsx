"use client"

import { Appbar } from "@/components/Appbar";
import { useSocket } from "@/context/SocketProvider";
import { useState } from "react";

export default function Dashboard() {
    const { sendMessage, messages } = useSocket();
    const [messsage, setMessage] = useState('');
    return <div>

        <div>
            <input onChange={(e) => {
                setMessage(e.target.value)
            }} placeholder="..." className="w-48 h-12 p-2 rounded-lg border-black border-2 border-solid text-black" />
            <button onClick={(e) => {
                sendMessage(messsage)
            }} className="w-12 h-11 p-2 rounded-lg bg-slate-200 text-black">Send</button>
        </div>
        <div>
            <div>
                {messages.map((e) => <li>{e}</li>)}
            </div>
        </div>

    </div>
}