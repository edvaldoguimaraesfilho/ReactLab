import type { GalleryImage } from "../models/GalleryImage";

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: "Modern Workspace",
    category: "Office",
    description: "A clean Microsoft-style workspace for productivity.",
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    featured: true,
  },
  {
    id: 2,
    title: "Team Collaboration",
    category: "People",
    description: "A visual card representing teamwork and planning.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    featured: false,
  },
  {
    id: 3,
    title: "Cloud Architecture",
    category: "Technology",
    description: "A technical visual for cloud and enterprise systems.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    featured: true,
  },
  {
    id: 4,
    title: "Dashboard Review",
    category: "Analytics",
    description: "A dashboard-inspired image for data analysis.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    featured: false,
  },
];