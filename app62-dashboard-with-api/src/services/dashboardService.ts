import type { DashboardPost } from "../models/DashboardPost";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getDashboardPosts(): Promise<DashboardPost[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load dashboard data.");
  }

  return response.json();
}