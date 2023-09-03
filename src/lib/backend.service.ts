import { getAuthData } from '@/lib/jira.service';

async function callBackend(path: string, queryParams: Record<string, string>) {
  const { accessToken, cloudId } = await getAuthData();
  const url = `${process.env.BACKEND_URL as string}${path}?${new URLSearchParams(queryParams)}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'x-access-token': accessToken,
      'x-cloud-id': cloudId,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error(`failed fetch from ${url}`, await res.text());
    throw Error(`Failed to fetch from ${url}`);
  }

  const result = await res.json();
  return result;
}
