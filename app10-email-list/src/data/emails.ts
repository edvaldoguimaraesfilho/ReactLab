import type { EmailMessage } from "../models/EmailMessage";

export const emails: EmailMessage[] = [
  {
    id: 1,
    sender: "Finance Team",
    initials: "FT",
    subject: "Monthly budget review",
    preview: "Please review the updated budget numbers before Friday.",
    time: "08:45",
    category: "Finance",
    unread: true,
  },
  {
    id: 2,
    sender: "HR Department",
    initials: "HR",
    subject: "New onboarding policy",
    preview: "The onboarding process has been updated for new employees.",
    time: "09:20",
    category: "HR",
    unread: false,
  },
  {
    id: 3,
    sender: "Project Office",
    initials: "PO",
    subject: "Sprint planning agenda",
    preview: "Here is the proposed agenda for tomorrow's planning session.",
    time: "10:10",
    category: "Project",
    unread: true,
  },
  {
    id: 4,
    sender: "Security Team",
    initials: "ST",
    subject: "Password policy reminder",
    preview: "Remember to update your password according to company rules.",
    time: "11:30",
    category: "Security",
    unread: false,
  },
];