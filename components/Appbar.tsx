


"use client"

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Appbar = () => {
    const router = useRouter();

    const handleSignIn = () => {
        router.push('/api/auth/signin');
    };
    const session = useSession();

    return (
        <div className="flex justify-between bg-pink-400">
            <div className="flex justify-between items-center text-slate-600 text-lg ">
                Chit-Chat
            </div>

            <div>
                {session.data?.user && <button className="p-2 m-2 bg-pink-200 rounded text-slate-600 text-lg" onClick={() => signOut()}>LogOut</button>}
                {!session.data?.user && <button className="p-2 m-2 bg-pink-200 rounded text-slate-600 text-lg" onClick={handleSignIn}>Signin</button>}

            </div>
        </div>
    );
};