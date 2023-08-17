import { iSoftClient } from '../../../../client';
import NextAuth, { AuthOptions, type User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if (!email || !password) {
          return null;
        }
        const client = new iSoftClient({
          BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        });
        const userData =
          await client.authEndpointsLoginGetProfile.authControllerLogin({
            requestBody: {
              email,
              password,
              localBasketProducts: [],
              localWishlistProducts: [],
            },
          });
        if (
          (userData && userData.role === 'admin') ||
          userData.role === 'editor'
        ) {
          return {
            id: String(userData.id),
            name: userData.firstName,
            email: userData.email,
            image: userData.img,
            role: userData.role,
            token: userData.token,
          };
        } else {
          throw new Error("User doesn't have any rights.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ account, token, user }) {
      if (account) {
        token.name = user.name;
      }
      if (user) {
        //@ts-ignore
        token.token = user.token;
        //@ts-ignore
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        //@ts-ignore
        session.user.token = token.token;
        //@ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
