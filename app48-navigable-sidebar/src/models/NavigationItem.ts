import type { ReactElement } from "react";

export interface NavigationItem {
  id: string;
  label: string;
  description: string;
  icon: ReactElement;
}