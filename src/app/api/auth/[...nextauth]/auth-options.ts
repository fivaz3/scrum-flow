import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { z } from 'zod';
import { atlassianProvider } from '@/app/api/auth/[...nextauth]/atlassian-provider';
import fs from 'fs';

const ATLASSIAN_REFRESH_TOKEN_URL = 'https://auth.atlassian.com/oauth/token';

function saveInsomniaConfig(access_token: string) {
  const pathToFile = 'insomnia-config.json';
  fs.readFile(pathToFile, 'utf8', function (err, configString) {
    if (err) {
      console.log(err);
      return;
    }

    try {
      // Parse the JSON data
      const config = JSON.parse(configString);

      // Modify the data
      config.access_token = access_token;

      // Write the modified data back to the file
      fs.writeFile(pathToFile, JSON.stringify(config, null, 2), function (err) {
        if (err) {
          console.log(err);
          return;
        }
      });
    } catch (error) {
      // configString is sometimes an empty string which provokes SyntaxError when executing JSON.parse(configString)
      if (!(error instanceof SyntaxError)) {
        throw error;
      }
    }
  });
}

// TODO check if I should add a zod validation for these data
function validateToken(data: unknown) {
  const RefreshTokenSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    expires_in: z.number(),
  });

  const result = RefreshTokenSchema.safeParse(data);

  if (!result.success) {
    throw new Error("fetched token doesn't match zod schema", { cause: result.error.issues });
  }

  saveInsomniaConfig(result.data.access_token);

  return result.data;
}

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

  const { access_token, expires_in, refresh_token } = validateToken(await response.json());

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
          saveInsomniaConfig(account.access_token);

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
        if (error instanceof Error) {
          console.log(error.message, error.cause);
        }
        // The error property will be used client-side to handle the refresh token error
        return { ...token, error: 'RefreshAccessTokenError' };
      }
    },
    async session({ session, token }) {
      saveInsomniaConfig(token.access_token);
      // Send properties to the client, like an access_token from a provider.
      session.access_token = token.access_token;
      if (token.error) {
        session.error = token.error;
      }
      return session;
    },
  },
} satisfies AuthOptions;
