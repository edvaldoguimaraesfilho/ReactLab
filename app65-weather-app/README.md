App 65 é **Weather App**, no Bloco 4 — Effects e Arquitetura. A lista oficial marca App 65 como Weather App e APIs externas. 

Use **Open-Meteo**: é grátis, open-source, não exige API key e tem forecast global. ([Open Meteo][1])
React `useEffect` é correto aqui porque estamos sincronizando o componente com um sistema externo: a API de clima. ([React][2])

```powershell
cd C:\ReactApps
New-Item bloco04 -ItemType Directory
cd bloco04

npm create vite@latest app65-weather-app -- --template react-ts
cd app65-weather-app

npm install
npm install @fluentui/react-components @fluentui/react-icons

New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\WeatherModels.ts -ItemType File
New-Item src\services\weatherService.ts -ItemType File
New-Item src\data\cities.ts -ItemType File
New-Item src\components\WeatherCard.tsx -ItemType File
New-Item src\components\CitySelector.tsx -ItemType File
New-Item src\components\WeatherDashboard.tsx -ItemType File
New-Item artigo.md -ItemType File
```

# App 65 — Weather App

## 1. `src\models\WeatherModels.ts`

```ts
export interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface WeatherApiResponse {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
  };
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
  };
}

export interface WeatherViewModel {
  cityName: string;
  country: string;
  temperature: number;
  temperatureUnit: string;
  humidity: number;
  humidityUnit: string;
  windSpeed: number;
  windSpeedUnit: string;
  time: string;
}
```

## 2. `src\data\cities.ts`

```ts
import type { City } from "../models/WeatherModels";

export const cities: City[] = [
  {
    id: 1,
    name: "São Paulo",
    country: "Brazil",
    latitude: -23.5505,
    longitude: -46.6333,
  },
  {
    id: 2,
    name: "Cape Town",
    country: "South Africa",
    latitude: -33.9249,
    longitude: 18.4241,
  },
  {
    id: 3,
    name: "London",
    country: "United Kingdom",
    latitude: 51.5072,
    longitude: -0.1276,
  },
  {
    id: 4,
    name: "New York",
    country: "United States",
    latitude: 40.7128,
    longitude: -74.006,
  },
];
```

## 3. `src\services\weatherService.ts`

```ts
import type {
  City,
  WeatherApiResponse,
  WeatherViewModel,
} from "../models/WeatherModels";

export async function getCurrentWeather(
  city: City
): Promise<WeatherViewModel> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${city.latitude}` +
    `&longitude=${city.longitude}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not load weather data.");
  }

  const data: WeatherApiResponse = await response.json();

  return {
    cityName: city.name,
    country: city.country,
    temperature: data.current.temperature_2m,
    temperatureUnit: data.current_units.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    humidityUnit: data.current_units.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    windSpeedUnit: data.current_units.wind_speed_10m,
    time: data.current.time,
  };
}
```

## 4. `src\components\CitySelector.tsx`

```tsx
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
```

## 5. `src\components\WeatherCard.tsx`

```tsx
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
```

## 6. `src\components\WeatherDashboard.tsx`

```tsx
import { useEffect, useState } from "react";

import { cities } from "../data/cities";
import { getCurrentWeather } from "../services/weatherService";

import type {
  City,
  WeatherViewModel,
} from "../models/WeatherModels";

import { CitySelector } from "./CitySelector";
import { WeatherCard } from "./WeatherCard";

export function WeatherDashboard() {
  const [selectedCity, setSelectedCity] =
    useState<City>(cities[0]);

  const [weather, setWeather] =
    useState<WeatherViewModel | null>(null);

  const [loading, setLoading] =
    useState<boolean>(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadWeather() {
      try {
        setLoading(true);
        setError(null);

        const result = await getCurrentWeather(selectedCity);

        if (!ignore) {
          setWeather(result);
        }
      } catch {
        if (!ignore) {
          setError("Unable to load weather information.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      ignore = true;
    };
  }, [selectedCity]);

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gap: "24px",
        width: "100%",
        maxWidth: "1100px",
      }}
    >
      <CitySelector
        cities={cities}
        selectedCityId={selectedCity.id}
        onSelectCity={setSelectedCity}
      />

      <WeatherCard
        weather={weather}
        loading={loading}
        error={error}
      />
    </section>
  );
}
```

## 7. `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { WeatherDashboard } from "./components/WeatherDashboard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto 32px auto",
        }}
      >
        <Title1>App 65 — Weather App</Title1>

        <Text>
          A React application that consumes an external weather API using
          useEffect, TypeScript services, loading state, error state, and
          Fluent UI components.
        </Text>
      </section>

      <WeatherDashboard />
    </main>
  );
}

export default App;
```

## 8. `src\main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

## 9. `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
```

## Run

```powershell
npm run dev
npm run build
npm run preview
```

## Technical Summary

| Concept           | Explanation                                     |
| ----------------- | ----------------------------------------------- |
| `useEffect`       | Synchronizes the component with the weather API |
| `fetch`           | Calls Open-Meteo                                |
| Service layer     | Keeps API logic outside components              |
| Loading state     | Shows `Spinner` while request is running        |
| Error state       | Shows friendly message when request fails       |
| TypeScript models | Define API and UI data shapes                   |
| Derived ViewModel | Converts API response into UI-ready data        |
| Fluent UI         | Provides Card, Button, Spinner, Text            |
| Cleanup flag      | Avoids updating state after stale requests      |

## Where we are

| Block   |                 Apps | Status    |
| ------- | -------------------: | --------- |
| Block 1 |                01–20 | Completed |
| Block 2 |                21–40 | Completed |
| Block 3 |                41–60 | Completed |
| Block 4 |                   61 | Completed |
| Block 4 |                   62 | Completed |
| Block 4 |                   63 | Completed |
| Block 4 |                   64 | Completed |
| Block 4 |       65 Weather App | Current   |
| Block 4 | 66 Pagination System | Next      |

[1]: https://open-meteo.com/?utm_source=chatgpt.com "Open-Meteo.com: 🌤️ Free Open-Source Weather API"
[2]: https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com "Synchronizing with Effects"
