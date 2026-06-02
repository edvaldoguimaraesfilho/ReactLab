import type { Repository } from "../models/Repository";

export async function searchRepositories(
  query: string
): Promise<Repository[]> {

  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}`
  );

  const data = await response.json();

  return data.items;
}