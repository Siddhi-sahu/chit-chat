import prisma from "@/lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
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
        async signIn({ user }) {
            if (!user.email) {
                return false
            }

            try {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email }

                })
                if (!existingUser) {

                    await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name ?? "Anonymous",
                            id: Number(user.id),
                            provider: "Google"

                        }
                    })
                }
                console.log(user.name)

            } catch (e) {
                console.log(e);
                return false;
            }

            return true;
        }
        // async redirect({ url, baseUrl }) {
        //     return `${baseUrl}/dashboard`;
        // }

    }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };