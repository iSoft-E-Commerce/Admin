import { getSession, signOut } from 'next-auth/react';
import { iSoftClient } from '../../client';

export const checkAuth = async () => {
  const session = await getSession();
  //@ts-ignore
  if (session?.user.token) {
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session.user.token,
    });
    try {
      await client.authEndpointsLoginGetProfile.authControllerGetProfile();
    } catch (error) {
      await signOut({ redirect: true });
    }
  }
};
