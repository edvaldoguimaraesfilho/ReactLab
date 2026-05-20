import { emails } from "../data/emails";
import { EmailItem } from "./EmailItem";

export function EmailList() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "32px",
      }}
    >
      {emails.map((email) => (
        <EmailItem key={email.id} email={email} />
      ))}
    </div>
  );
}