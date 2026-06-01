import type { DashboardMetrics } from "../models/DashboardMetrics";

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  await new Promise(resolve =>
    setTimeout(resolve, 1200)
  );

  return {
    totalUsers: 1450,
    activeProjects: 37,
    openTickets: 82,
    revenue: 325000,
  };
}