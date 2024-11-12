import prisma from "@/lib/db";
import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = NextAuth({
    providers: [
        // CredentialsProvider({
        //     name: 'Credentials',
        //     credentials: {
        //         Email: { label: 'email', type: 'text', placeholder: "email" },
        //         password: { label: 'password', type: 'password', placeholder: "password" }
        //     },
        //     async authorize(credentials: any) {
        //         return {
        //             id: "user1"
        //         };
        //     }

        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    //TODO: add user to db
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn(params) {
            if (!params.user.email) {
                return false
            }

            try {
                await prisma.user.create({
                    data: {
                        email: params.user.email,
                        provider: "Google"

                    }
                })

            } catch (e) {
                console.log(e)
            }

            return true;
        },
        async redirect({ url, baseUrl }) {
            return `${baseUrl}/dashboard`;
        }
    }
});

export { handler as GET, handler as POST }