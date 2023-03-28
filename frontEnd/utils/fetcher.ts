export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  if (!res.ok || res.status !== 200) {
    const error: Error & { info: any; status: number } = Object.assign(
      new Error("An error occurred while fetching the data."),
      {
        info: await res.json(),
        status: res.status,
      }
    );
    throw error;
  }

  return res.json();
}

export class JSONResultWrapper<T> {
  ok: boolean;
  code: number;
  msg: string;
  data: T;
}

export { JSONResultWrapper as ApiWrapper };
