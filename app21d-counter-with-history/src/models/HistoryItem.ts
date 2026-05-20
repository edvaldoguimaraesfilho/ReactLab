export interface HistoryItem {
  id: number;
  action: "Increase" | "Decrease" | "Reset";
  previousValue: number;
  nextValue: number;
  step: number;
}