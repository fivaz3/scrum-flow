import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_APP_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string,
    }),
    // AtlassianProvider({
    //   clientId: process.env.ATLASSIAN_CLIENT_ID as string,
    //   clientSecret: process.env.ATLASSIAN_CLIENT_SECRET as string,
    //   // TODO check what this authorization does
    //   authorization: {
    //     params: {
    //       scope: 'write:jira-work read:jira-work read:jira-user offline_access read:me',
    //     },
    //   },
    // }),
  ],
});

export { handler as GET, handler as POST };
