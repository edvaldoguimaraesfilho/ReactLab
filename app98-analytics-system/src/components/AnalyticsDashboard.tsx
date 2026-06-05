import { analyticsData } from "../data/analyticsData";

import { AnalyticsSummary } from "./AnalyticsSummary";
import { AnalyticsGrid } from "./AnalyticsGrid";

export function AnalyticsDashboard() {
  return (
    <>
      <AnalyticsSummary
        totalMetrics={analyticsData.length}
      />

      <AnalyticsGrid
        metrics={analyticsData}
      />
    </>
  );
}