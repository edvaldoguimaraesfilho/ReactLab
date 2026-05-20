import { dashboardCards } from "../data/dashboardCards";
import { DashboardCardItem } from "./DashboardCardItem";

export function DashboardGrid() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {dashboardCards.map((card) => (
        <DashboardCardItem key={card.id} card={card} />
      ))}
    </section>
  );
}