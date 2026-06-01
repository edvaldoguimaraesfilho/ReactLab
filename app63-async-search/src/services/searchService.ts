import type { UserResult } from "../models/UserResult";

export async function searchUsers(
  query: string
): Promise<UserResult[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }

  const data: UserResult[] =
    await response.json();

  return data.filter((user) =>
    user.name
      .toLowerCase()
      .includes(query.toLowerCase())
  );
}