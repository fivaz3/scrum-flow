import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function getAccessToken() {
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

function validateResources(data: unknown) {
  const ResourcesSchema = z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  );

  return ResourcesSchema.safeParse(data);
}

export async function getCloudId(accessToken: string) {
  const resources = await fetchResources(accessToken);

  // TODO test this application with a account without any activating any Jira service to see if this error case makes sense
  if (!Array.isArray(resources) || resources.length === 0) {
    console.error(resources);
    throw Error("You haven't created your profile yet");
  }

  const validatedResources = validateResources(resources);

  if (!validatedResources.success) {
    console.error(validatedResources.error.errors);
    throw Error('There was an error when fetching your resource');
  }

  return validatedResources.data[0].id;
}

export function validateJiraResponse(data: unknown) {
  const JiraResponseSchema = z.object({
    maxResults: z.number(),
    startAt: z.number(),
    isLast: z.boolean(),
    values: z.array(z.unknown()),
  });

  const result = JiraResponseSchema.safeParse(data);

  if (!result.success) {
    console.error(result.error.errors);
    throw Error('There was an error when fetching this resource');
  }

  return result.data;
}
