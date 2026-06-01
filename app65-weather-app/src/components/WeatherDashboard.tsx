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