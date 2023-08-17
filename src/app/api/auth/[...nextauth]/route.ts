import NextAuth from 'next-auth';
import AtlassianProvider from 'next-auth/providers/atlassian';

const handler = NextAuth({
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
});

export { handler as GET, handler as POST };
