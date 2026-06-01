import type { User } from "../models/User";

let cache: User[] | null = null;

export async function getUsers(): Promise<User[]> {

  if (cache) {
    console.log("Returning data from cache");
    return cache;
  }

  console.log("Fetching API");

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  const data = await response.json();

  cache = data.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company.name,
  }));

  return cache;
}