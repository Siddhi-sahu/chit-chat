"use client"

import { useSocket } from "@/context/SocketProvider";
import { useState } from "react";

export default function Dashboard() {
    const { sendMessage, messages } = useSocket();
    const [messsage, setMessage] = useState('');
    return <div className="w-full h-screen bg-pink-300 flex justify-center items-start" >

        <div style={{ minHeight: '35rem' }} className="flex flex-col bg-white w-2/6 rounded m-2">
            <div >
                <input onChange={(e) => {
                    setMessage(e.target.value)
                }} placeholder="..." className="w-3/4 h-12 m-4 p-2 rounded-lg border-black border-2 border-solid text-black" />
                <button onClick={(e) => {
                    sendMessage(messsage)
                }} className="w-14 h-11 p-2 rounded-lg bg-slate-200 text-black">Send</button>
            </div>
            <div>
                <div className="m-4">
                    {messages.map((e) => <li>{e}</li>)}
                </div>
            </div>


        </div>

    </div>
}