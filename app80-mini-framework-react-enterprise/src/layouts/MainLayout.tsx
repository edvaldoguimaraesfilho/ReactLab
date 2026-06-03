import { AppHeader } from "../components/AppHeader";

export function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <AppHeader />

      {children}
    </main>
  );
}