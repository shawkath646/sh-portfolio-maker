import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { db, serverTimeStamp } from "@/lib/firebase";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
    ],
    pages: {
        signIn: '/login',
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                const username = (session.user.email.split('@'))[0];
                const userRef = await db.collection('metadata').doc(username).get();
                if (!userRef.exists) {
                    const userData = {
                        ...session.user,
                        isLocked: false,
                        isSuspended: false,
                        joinedOn: serverTimeStamp,
                        lastLogin: serverTimeStamp,
                        username,
                        role: 'user',
                        views: 0
                    }
                    await db.collection('metadata').doc(username).set(userData);
                }
            }
            return session;
        },
        jwt: async ({ user, token }) => {
          if (user) {
            token.uid = user.id;
          }
          return token;
        },
      },
      session: {
        strategy: 'jwt',
    },
};

const handler = NextAuth(authOptions);

export { authOptions }

export { handler as GET, handler as POST };