import { getCloudId } from '@/lib/jira.service';

export async function getBackEnd(path: string, accessToken: string): Promise<unknown> {
  const cloudId = await getCloudId(accessToken);
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL as string}${path}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken} ${cloudId}`,
    },
  });

  if (!res.ok) {
    throw Error(`An error occurred while accessing ${url} : ${await res.text()}`);
  }

  return await res.json();
}

export async function postBackEnd(path: string, data: unknown, accessToken: string) {
  const cloudId = await getCloudId(accessToken);
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL as string}${path}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken} ${cloudId}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw Error(`An error occurred while accessing ${url} : ${await res.text()}`);
  }

  return await res.json();
}
