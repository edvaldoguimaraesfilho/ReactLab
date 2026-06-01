import type { CalendarEvent }
from "../models/CalendarEvent";

export const calendarEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Executive Strategy Meeting",
    date: "Monday, May 25",
    time: "09:00 AM",
    organizer: "Corporate Management",
    location: "Conference Room A",
    status: "Confirmed",
  },
  {
    id: 2,
    title: "SharePoint Architecture Review",
    date: "Tuesday, May 26",
    time: "11:30 AM",
    organizer: "Platform Team",
    location: "Microsoft Teams",
    status: "Pending",
  },
  {
    id: 3,
    title: "Financial Dashboard Presentation",
    date: "Wednesday, May 27",
    time: "02:00 PM",
    organizer: "Analytics Department",
    location: "Executive Board Room",
    status: "Confirmed",
  },
  {
    id: 4,
    title: "Infrastructure Migration Review",
    date: "Thursday, May 28",
    time: "04:00 PM",
    organizer: "Infrastructure Team",
    location: "Operations Center",
    status: "Canceled",
  },
];