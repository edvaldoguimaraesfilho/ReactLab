import type { DashboardMetric } from "../models/DashboardMetric";
import type { SalesRecord } from "../models/SalesRecord";

export const metrics: DashboardMetric[] = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$842,500",
    variation: "+12.4%",
    status: "positive",
  },
  {
    id: 2,
    title: "Active Customers",
    value: "18,240",
    variation: "+8.1%",
    status: "positive",
  },
  {
    id: 3,
    title: "Operating Cost",
    value: "$214,900",
    variation: "-3.2%",
    status: "positive",
  },
  {
    id: 4,
    title: "Pending Orders",
    value: "326",
    variation: "+5.7%",
    status: "negative",
  },
];

export const salesRecords: SalesRecord[] = [
  {
    id: 1,
    region: "North America",
    revenue: 320000,
    target: 280000,
    customers: 7200,
    status: "Above Target",
  },
  {
    id: 2,
    region: "Europe",
    revenue: 245000,
    target: 260000,
    customers: 5100,
    status: "Below Target",
  },
  {
    id: 3,
    region: "Latin America",
    revenue: 178000,
    target: 150000,
    customers: 3400,
    status: "Above Target",
  },
  {
    id: 4,
    region: "Asia Pacific",
    revenue: 99500,
    target: 120000,
    customers: 2540,
    status: "Below Target",
  },
];