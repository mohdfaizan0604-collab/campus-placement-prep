/**
 * Small browser helper for the JSON routes (interview, aptitude, resume).
 * Chat does not use this file because its response is a text stream, not JSON.
 */

export async function postJSON<T>(url: string, body: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Could not reach the server. Check that the app is running.");
  }

  const data = (await response.json().catch(() => null)) as { error?: string } | null;
  if (!response.ok) {
    throw new Error(data?.error || "The request failed.");
  }
  return data as T;
}
