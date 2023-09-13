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

// TODO fix the refresh Access Token being called multiple times, possible fix the updated tutorial
// https://authjs.dev/guides/basics/refresh-token-rotation using cookies to save the refresh token and avoid requesting it twice

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

  console.log(`calling ${ATLASSIAN_REFRESH_TOKEN_URL}`);

  if (!response.ok) {
    console.log(`Error refreshing access token ${await response.text()}`);
    throw new Error(`Error refreshing access token ${await response.text()}`);
  }

  const { access_token, expires_in, refresh_token } = validateToken(await response.json());
  console.log('token refreshed');

  // saveInsomniaConfig(access_token, refresh_token);

  return {
    ...token, // Keep the previous token properties
    access_token,
    refresh_token,
    expires_at: Math.floor(Date.now() / 1000 + expires_in),
  };
}

export default {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [atlassianProvider],
  callbacks: {
    async jwt({ token, account }) {
      try {
        // Persist the OAuth access_token to the token right after sign in
        if (account) {
          // saveInsomniaConfig(account.access_token, account.refresh_token);

          token.access_token = account.access_token;
          token.expires_at = account.expires_at;
          token.refresh_token = account.refresh_token;
        }

        if (!token.expires_at) {
          throw new Error("Something went wrong with the token, it doesn't have expires_at", {
            cause: token,
          });
        }

        if (Date.now() < token.expires_at * 1000) {
          // console.log(
          //   `token is still valid for:${
          //     (token.expires_at * 1000 - Date.now()) / (60 * 1000)
          //   } minutes`
          // );
          return token;
        }

        return await refreshAccessToken(token);
      } catch (error) {
        // The error property will be used client-side to handle the refresh token error
        return { ...token, error: 'RefreshAccessTokenError' };
      }
    },
    async session({ session, token }) {
      // console.log(token.access_token, '\n');
      // Send properties to the client, like an access_token from a provider.
      if (!token) {
        console.log(
          "token doesn't exist alertasdasdas as d asd sad sad asdsa dsadsad ashdu isahdu hasduih asudh asuidh uisadh uiasdhuiashduishd sauodh ufasdhfauiosdhfui"
        );
      }
      session.access_token = token.access_token;
      if (token.error) {
        session.error = token.error;
      }
      return session;
    },
  },
} satisfies AuthOptions;
