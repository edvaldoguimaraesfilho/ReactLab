import { calendarEvents }
from "../data/calendarEvents";

import { EventCard }
from "./EventCard";

export function CalendarBoard() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "24px",
        marginTop: "32px",
      }}
    >
      {calendarEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
        />
      ))}
    </section>
  );
}