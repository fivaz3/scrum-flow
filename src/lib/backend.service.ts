import { getCloudId } from '@/lib/jira.service';

export async function requestBackEnd(
  method: 'GET' | 'POST' | 'PUT',
  path: string,
  data: unknown,
  accessToken: string
): Promise<unknown> {
  const cloudId = await getCloudId(accessToken);
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL as string}${path}`;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken} ${cloudId}`,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    throw Error(`An error occurred while accessing ${url} : ${await res.text()}`);
  }

  return await res.json();
}

export async function getBackEnd(path: string, accessToken: string): Promise<unknown> {
  return requestBackEnd('GET', path, null, accessToken);
}

export async function postBackEnd(path: string, data: unknown, accessToken: string) {
  return requestBackEnd('POST', path, data, accessToken);
}

export async function putBackEnd(path: string, data: unknown, accessToken: string) {
  return requestBackEnd('PUT', path, data, accessToken);
}
