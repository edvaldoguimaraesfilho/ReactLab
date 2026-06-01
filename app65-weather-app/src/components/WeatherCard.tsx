import {
  Card,
  Spinner,
  Text,
  Title1,
  Title2,
  Body1,
} from "@fluentui/react-components";

import {
  WeatherSunny24Regular,
  WeatherDrizzle24Regular,
  WeatherDuststorm24Regular,
} from "@fluentui/react-icons";

import type { WeatherViewModel } from "../models/WeatherModels";

interface WeatherCardProps {
  weather: WeatherViewModel | null;
  loading: boolean;
  error: string | null;
}

export function WeatherCard({
  weather,
  loading,
  error,
}: WeatherCardProps) {
  if (loading) {
    return (
      <Card style={{ padding: "32px" }}>
        <Spinner label="Loading weather data..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card style={{ padding: "32px" }}>
        <Title2>Weather Error</Title2>
        <Text>{error}</Text>
      </Card>
    );
  }

  if (!weather) {
    return (
      <Card style={{ padding: "32px" }}>
        <Title2>No weather selected</Title2>
      </Card>
    );
  }

  return (
    <Card
      style={{
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <WeatherSunny24Regular />

      <Title1>
        {weather.cityName}, {weather.country}
      </Title1>

      <Title2>
        {weather.temperature}
        {weather.temperatureUnit}
      </Title2>

      <Body1>
        Current weather data loaded from an external API.
      </Body1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        <Card>
          <WeatherDrizzle24Regular />
          <Text>Humidity</Text>
          <Title2>
            {weather.humidity}
            {weather.humidityUnit}
          </Title2>
        </Card>

        <Card>
          <WeatherDuststorm24Regular />
          <Text>Wind Speed</Text>
          <Title2>
            {weather.windSpeed}
            {weather.windSpeedUnit}
          </Title2>
        </Card>
      </div>

      <Text size={200}>Last update: {weather.time}</Text>
    </Card>
  );
}