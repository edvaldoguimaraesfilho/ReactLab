import { timelineEvents } from "../data/timelineEvents";
import { TimelineEventCard } from "./TimelineEventCard";

export function Timeline() {
  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {timelineEvents.map((event) => (
        <TimelineEventCard key={event.id} event={event} />
      ))}
    </div>
  );
}