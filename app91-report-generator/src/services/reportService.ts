import { reports } from "../data/reports";
import type { Report } from "../models/Report";

export function getReports(): Report[] {
  return reports;
}

export function getTotalRecords(items: Report[]): number {
  return items.reduce((total, report) => total + report.records, 0);
}

export function getReadyReports(items: Report[]): number {
  return items.filter((report) => report.status === "Ready").length;
}