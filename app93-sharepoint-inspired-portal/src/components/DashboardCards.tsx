import {
  Card,
  CardHeader,
  Text,
  Title2,
  Title3,
} from "@fluentui/react-components";

const cards = [
  {
    id: 1,
    title: "Documents",
    value: "248",
    description: "Active corporate files",
  },
  {
    id: 2,
    title: "Departments",
    value: "12",
    description: "Connected business areas",
  },
  {
    id: 3,
    title: "Projects",
    value: "36",
    description: "Running initiatives",
  },
  {
    id: 4,
    title: "Employees",
    value: "1,420",
    description: "Portal users",
  },
];

export function DashboardCards() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
      }}
    >
      {cards.map((card) => (
        <Card key={card.id}>
          <CardHeader header={<Title3>{card.title}</Title3>} />
          <Title2>{card.value}</Title2>
          <Text>{card.description}</Text>
        </Card>
      ))}
    </section>
  );
}