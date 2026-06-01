import {
  Button,
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { City } from "../models/WeatherModels";

interface CitySelectorProps {
  cities: City[];
  selectedCityId: number;
  onSelectCity: (city: City) => void;
}

export function CitySelector({
  cities,
  selectedCityId,
  onSelectCity,
}: CitySelectorProps) {
  return (
    <Card
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <Title3>Select a City</Title3>

      <Text>
        Choose a location to load current weather data from Open-Meteo.
      </Text>

      {cities.map((city) => (
        <Button
          key={city.id}
          appearance={
            city.id === selectedCityId ? "primary" : "secondary"
          }
          onClick={() => onSelectCity(city)}
        >
          {city.name}, {city.country}
        </Button>
      ))}
    </Card>
  );
}