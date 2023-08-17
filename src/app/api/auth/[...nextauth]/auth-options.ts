import { AuthOptions } from 'next-auth';
import AtlassianProvider from 'next-auth/providers/atlassian';

export default {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    AtlassianProvider({
      clientId: process.env.ATLASSIAN_CLIENT_ID as string,
      clientSecret: process.env.ATLASSIAN_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'write:jira-work read:jira-work read:jira-user offline_access read:me',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
} satisfies AuthOptions;
