import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { z } from 'zod';
import { atlassianProvider } from '@/app/api/auth/[...nextauth]/atlassian-provider';

const ATLASSIAN_REFRESH_TOKEN_URL = 'https://auth.atlassian.com/oauth/token';

function validateToken(data: unknown) {
  console.log('trying to validate token');
  const RefreshTokenSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    expires_in: z.number(),
  });

  return RefreshTokenSchema.parse(data);
}

// TODO fix the refresh Access Token being called multiple times

async function refreshAccessToken(token: JWT) {
  try {
    console.log("token isn't valid anymore refreshing it");

    const response = await fetch(ATLASSIAN_REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: process.env.ATLASSIAN_CLIENT_ID,
        client_secret: process.env.ATLASSIAN_CLIENT_SECRET,
        refresh_token: token.refresh_token,
      }),
    });

    // console.log(`calling ${ATLASSIAN_REFRESH_TOKEN_URL}`);

    const unknownTokens = await response.json();

    if (!response.ok) {
      const message = await response.text();
      console.log(`Error refreshing access token ${message}`);
      console.log('invalid tokens received', unknownTokens);
      throw new Error(`Error refreshing access token ${message}`);
    }

    const tokens = validateToken(unknownTokens);

    console.log('unknownTokens', unknownTokens);

    console.log('token refreshed');

    return {
      ...token, // Keep the previous token properties
      access_token: tokens.access_token,
      expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
      refresh_token: tokens.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.error('Error refreshing access token', error);
    // The error property will be used client-side to handle the refresh token error
    return { ...token, error: 'RefreshAccessTokenError' as const };
  }
}

export default {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [atlassianProvider],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after sign in
      if (account) {
        // saveInsomniaConfig(account.access_token, account.refresh_token);

        token.access_token = account.access_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
      }

      if (token.expires_at && Date.now() < token.expires_at * 1000) {
        console.log(
          `token is still valid for:${(token.expires_at * 1000 - Date.now()) / (60 * 1000)} minutes`
        );
        return token;
      } else {
        return await refreshAccessToken(token);
      }
    },
    async session({ session, token }) {
      // console.log(token.access_token, '\n');
      // Send properties to the client, like an access_token from a provider.
      session.access_token = token.access_token;
      if (token.error) {
        session.error = token.error;
      }
      return session;
    },
  },
} satisfies AuthOptions;
