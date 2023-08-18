import { AuthOptions } from 'next-auth';
import AtlassianProvider from 'next-auth/providers/atlassian';
import { JWT } from 'next-auth/jwt';
import { z } from 'zod';

const ATLASSIAN_REFRESH_TOKEN_URL = 'https://auth.atlassian.com/oauth/token';
async function refreshAccessToken(token: JWT) {
  console.log("token isn't valid anymore refreshing it");

  const response = await fetch(ATLASSIAN_REFRESH_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      client_id: process.env.ATLASSIAN_CLIENT_ID as string,
      client_secret: process.env.ATLASSIAN_CLIENT_SECRET as string,
      refresh_token: token.refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error('Error refreshing access token', { cause: await response.text() });
  }

  const RefreshTokenSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    expires_in: z.number(),
  });

  const result = RefreshTokenSchema.safeParse(await response.json());

  if (!result.success) {
    throw new Error("fetched token doesn't match zod schema", { cause: result.error.errors });
  }

  return {
    ...token, // Keep the previous token properties
    access_token: result.data.access_token,
    expires_at: Math.floor(Date.now() / 1000 + result.data.expires_in),
    refresh_token: result.data.refresh_token,
  };
}

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
      try {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.access_token = account.access_token;
          token.expires_at = account.expires_at;
          token.refresh_token = account.refresh_token;
        }

        if (!token.expires_at) {
          throw new Error("Something went wrong with token, it doesn't have expires_at", {
            cause: token,
          });
        }

        if (Date.now() < token.expires_at * 1000) {
          console.log(
            `token is still valid for:${
              (token.expires_at * 1000 - Date.now()) / (60 * 1000)
            } minutes`
          );
          return token;
        }

        return await refreshAccessToken(token);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message, error.cause);
        }
        // The error property will be used client-side to handle the refresh token error
        return { ...token, error: 'RefreshAccessTokenError' as const };
      }
    },
    async session(args) {
      // Send properties to the client, like an access_token from a provider.
      args.session.access_token = args.token.access_token;
      return args.session;
    },
  },
} satisfies AuthOptions;
