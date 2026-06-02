import {
  Button,
  Spinner,
  Text,
  Title1,
} from "@fluentui/react-components";

import {
  ArrowClockwise24Regular,
} from "@fluentui/react-icons";

import { useEffect, useState } from "react";

import { CryptoCard } from "./CryptoCard";

import type { CryptoCurrency } from "../models/CryptoCurrency";

import {
  getCryptocurrencies,
} from "../services/cryptoService";

export function CryptoDashboard() {
  const [cryptos, setCryptos] =
    useState<CryptoCurrency[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getCryptocurrencies();

      setCryptos(data);
    } catch {
      setError(
        "Unable to load cryptocurrency data."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Spinner label="Loading..." />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <Title1>
          Cryptocurrency Monitor
        </Title1>

        <Button
          icon={<ArrowClockwise24Regular />}
          onClick={loadData}
        >
          Refresh
        </Button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {cryptos.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            crypto={crypto}
          />
        ))}
      </div>
    </>
  );
}