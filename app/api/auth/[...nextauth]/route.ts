import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                Email: { label: 'email', type: 'text', placeholder: "email" },
                password: { label: 'password', type: 'password', placeholder: "password" }
            },
            async authorize(credentials: any) {
                return {
                    id: "user1"
                };
            }

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: ({ token, user }) => {
            token.userId = token.sub;
            return token
        }
    }
});

export { handler as GET, handler as POST }