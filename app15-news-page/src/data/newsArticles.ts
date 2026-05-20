import type { NewsArticle } from "../models/NewsArticle";

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "React Architecture Becomes More Component-Driven",
    summary:
      "Modern React applications are increasingly structured around small, reusable, and predictable components.",
    category: "React",
    author: "Frontend Team",
    date: "May 17, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Fluent UI Improves Enterprise Design Consistency",
    summary:
      "Microsoft Fluent UI helps teams build accessible, consistent, and professional business interfaces.",
    category: "Fluent UI",
    author: "Design System Team",
    date: "May 16, 2026",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "TypeScript Reduces UI Refactoring Risk",
    summary:
      "Strong typing improves maintainability when applications grow across components, models, and data files.",
    category: "TypeScript",
    author: "Engineering Team",
    date: "May 15, 2026",
    readTime: "6 min read",
  },
];