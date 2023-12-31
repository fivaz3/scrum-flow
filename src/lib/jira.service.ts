import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// This type can be anything except a Promise or a Function
type NotPromiseOrFunction<T extends unknown> = T extends Promise<unknown> | Function ? never : T;

export function validateData<Z, T>(zodSchema: z.ZodType<Z>, data: NotPromiseOrFunction<T>) {
  return zodSchema.parse(data);
}

export async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (!session?.access_token) {
    console.error("Unauthorized access detected, you don't have an access token");
    redirect('/api/auth/signin');
  }

  return session.access_token;
}

async function fetchResources(accessToken: string) {
  const url = 'https://api.atlassian.com/oauth/token/accessible-resources';
  // const url = `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/api/resources`;

  const res: Response = await fetch(url, {
    cache: 'force-cache',
    headers: {
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

export async function getCloudIdClient(accessToken: string) {
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
  const cloudId = await getCloudIdClient(accessToken);
  return { accessToken, cloudId };
}

export async function callApi(
  path: string,
  queryParams: Record<string, string>,
  accessToken: string,
  cloudId: string
) {
  const baseUrl = `https://api.atlassian.com/ex/jira/${cloudId}`;

  const url = `${baseUrl}${path}`;

  const res = await fetch(`${url}?${new URLSearchParams(queryParams)}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.log('res.status', res.status);
    console.log('res.statusText', res.statusText);
    console.error(`failed fetch from ${url}`, await res.text());
    throw Error(`Failed to fetch from ${path}`);
  }

  return await res.json();
}
