export type EmailCategory = "Finance" | "HR" | "Project" | "Security";

export interface EmailMessage {
  id: number;
  sender: string;
  initials: string;
  subject: string;
  preview: string;
  time: string;
  category: EmailCategory;
  unread: boolean;
}