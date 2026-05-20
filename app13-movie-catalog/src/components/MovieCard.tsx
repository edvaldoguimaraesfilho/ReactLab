import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import { Filmstrip24Regular } from "@fluentui/react-icons";
import type { Movie } from "../models/Movie";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
        minHeight: "260px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardHeader
        image={<Filmstrip24Regular />}
        header={<Title3>{movie.title}</Title3>}
        description={
          <Caption1>
            {movie.year} • {movie.duration}
          </Caption1>
        }
      />

      <Body1>{movie.description}</Body1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Badge appearance="filled">{movie.genre}</Badge>
        <Text size={200}>Rating: {movie.rating}</Text>
      </div>
    </Card>
  );
}