import { reports } from "../data/reports";

export async function getReports() {
  return Promise.resolve(reports);
}