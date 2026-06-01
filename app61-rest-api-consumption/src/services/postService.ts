import type { Post } from "../models/Post";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load posts from the REST API.");
  }

  const data: Post[] = await response.json();

  return data;
}