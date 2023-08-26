import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export function validateData<T>(zodSchema: z.ZodType<T>, data: unknown) {
  const result = zodSchema.safeParse(data);

  if (!result.success) {
    console.error(result.error.issues);
    throw Error("This data doesn't match its type");
  }

  return result.data;
}

async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (!session?.access_token) {
    console.error("Unauthorized access detected, you don't have an access token");
    redirect('/api/auth/signin');
  }

  return session.access_token;
}

async function fetchResources(accessToken: string) {
  const res: Response = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error('failed fetch resources', await res.text());
    throw Error(`Failed to fetch Resources`);
  }

  return await res.json();
}

async function getCloudId(accessToken: string) {
  const response = await fetchResources(accessToken);

  // TODO test this application with a account without any activating any Jira service to see if this error case makes sense
  if (!Array.isArray(response) || response.length === 0) {
    console.error(response);
    throw Error("You haven't created your profile yet");
  }

  const validatedResources = validateData(
    z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    ),
    response
  );

  return validatedResources[0].id;
}
export async function getAuthData() {
  const accessToken = await getAccessToken();
  const cloudId = await getCloudId(accessToken);
  return { accessToken, cloudId };
}

export async function callApi(path: string) {
  const { accessToken, cloudId } = await getAuthData();

  const baseUrl = `https://api.atlassian.com/ex/jira/${cloudId}`;

  const url = `${baseUrl}${path}`;

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error(`failed fetch from ${url}`, await res.text());
    throw Error(`Failed to fetch from ${path}`);
  }

  return await res.json();
}
