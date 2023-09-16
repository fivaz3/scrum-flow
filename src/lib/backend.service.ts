export async function requestBackEnd(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  data: unknown,
  accessToken: string,
  cloudId: string
): Promise<unknown> {
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

export async function getBackEnd(
  path: string,
  accessToken: string,
  cloudId: string
): Promise<unknown> {
  return requestBackEnd('GET', path, null, accessToken, cloudId);
}

export async function postBackEnd(
  path: string,
  data: unknown,
  accessToken: string,
  cloudId: string
) {
  return requestBackEnd('POST', path, data, accessToken, cloudId);
}

export async function putBackEnd(
  path: string,
  data: unknown,
  accessToken: string,
  cloudId: string
) {
  return requestBackEnd('PUT', path, data, accessToken, cloudId);
}

export async function deleteBackEnd(path: string, accessToken: string, cloudId: string) {
  return requestBackEnd('DELETE', path, null, accessToken, cloudId);
}
