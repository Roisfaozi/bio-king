import Credentials from 'next-auth/providers/credentials';

import { user } from '@/app/api/user/data';
import { getServerSession, NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const foundUser = user.find((u) => u.email === email);

        if (!foundUser) {
          return null;
        }

        const valid = password === foundUser.password;

        if (!valid) {
          return null;
        }

        if (foundUser) {
          return foundUser as any;
        }
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV !== 'production',
};

export const getAuthSession = async () => {
  return getServerSession(authOptions);
};
