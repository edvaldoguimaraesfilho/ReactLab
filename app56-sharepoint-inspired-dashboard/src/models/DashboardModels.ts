export interface QuickLinkItem {
  id: number;
  title: string;
  description: string;
  url: string;
}

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  summary: string;
  publishedDate: string;
}

export interface MetricItem {
  id: number;
  label: string;
  value: string;
  description: string;
}

export interface ActivityItem {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
}