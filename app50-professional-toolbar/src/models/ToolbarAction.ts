import type { JSX } from "react";

export interface ToolbarAction {
  id: number;
  title: string;
  icon: JSX.Element;
  appearance?: "primary" | "subtle" | "transparent";
}