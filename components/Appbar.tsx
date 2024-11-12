// "use client"

// import { signIn, signOut } from "next-auth/react";

// export const Appbar = () => {
//     return (
//         <div>

//             <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>Signin</button>
//             <button onClick={() => signOut()}>signOut</button>
//         </div>
//     )
// }


"use client"

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Appbar = () => {
    const router = useRouter();

    const handleSignIn = () => {
        router.push('/api/auth/signin');
    };

    return (
        <div>
            <button onClick={handleSignIn}>Signin</button>
            <button onClick={() => signOut()}>signOut</button>
        </div>
    );
};