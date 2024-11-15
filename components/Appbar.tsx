


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
        <div className="flex justify-between">
            <div>
                Chit-Chat
            </div>

            <div>
                {session.data?.user && <button onClick={() => signOut()}>LogOut</button>}
                {!session.data?.user && <button onClick={handleSignIn}>Signin</button>}

            </div>
        </div>
    );
};