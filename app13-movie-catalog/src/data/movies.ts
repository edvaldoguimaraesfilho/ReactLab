import type { Movie } from "../models/Movie";

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Silent Orbit",
    genre: "Science Fiction",
    year: 2024,
    rating: "PG-13",
    duration: "2h 08m",
    description: "A space crew discovers a lost signal near Jupiter.",
  },
  {
    id: 2,
    title: "Corporate Shadows",
    genre: "Thriller",
    year: 2023,
    rating: "R",
    duration: "1h 52m",
    description: "A financial analyst uncovers a hidden enterprise conspiracy.",
  },
  {
    id: 3,
    title: "Azure City",
    genre: "Drama",
    year: 2022,
    rating: "PG",
    duration: "1h 44m",
    description: "A young architect rebuilds her career in a futuristic city.",
  },
  {
    id: 4,
    title: "The Last Repository",
    genre: "Technology",
    year: 2025,
    rating: "PG-13",
    duration: "2h 15m",
    description: "A developer protects the final source code archive.",
  },
];