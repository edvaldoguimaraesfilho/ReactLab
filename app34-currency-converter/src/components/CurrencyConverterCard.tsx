import { useState } from "react";

import {
  Card,
  Dropdown,
  Field,
  Input,
  Option,
  Text,
  Title2,
  Button,
} from "@fluentui/react-components";

import { ArrowSwap24Regular } from "@fluentui/react-icons";

import { currencyRates } from "../data/currencyRates";

export function CurrencyConverterCard() {
  const [amount, setAmount] = useState("1");

  const [fromCurrency, setFromCurrency] = useState("USD");

  const [toCurrency, setToCurrency] = useState("BRL");

  function convertCurrency() {
    const fromRate =
      currencyRates.find(
        (currency) => currency.code === fromCurrency
      )?.rate ?? 1;

    const toRate =
      currencyRates.find(
        (currency) => currency.code === toCurrency
      )?.rate ?? 1;

    const numericAmount = Number(amount);

    const usdValue = numericAmount / fromRate;

    const convertedValue = usdValue * toRate;

    return convertedValue.toFixed(2);
  }

  function swapCurrencies() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <Card
      style={{
        width: "420px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Title2>Currency Converter</Title2>

      <Field label="Amount">
        <Input
          value={amount}
          onChange={(_, data) => setAmount(data.value)}
        />
      </Field>

      <Field label="From Currency">
        <Dropdown
          value={fromCurrency}
          selectedOptions={[fromCurrency]}
          onOptionSelect={(_, data) =>
            setFromCurrency(data.optionValue || "USD")
          }
        >
          {currencyRates.map((currency) => (
            <Option
              key={currency.code}
              value={currency.code}
            >
              {currency.code} - {currency.name}
            </Option>
          ))}
        </Dropdown>
      </Field>

      <Field label="To Currency">
        <Dropdown
          value={toCurrency}
          selectedOptions={[toCurrency]}
          onOptionSelect={(_, data) =>
            setToCurrency(data.optionValue || "BRL")
          }
        >
          {currencyRates.map((currency) => (
            <Option
              key={currency.code}
              value={currency.code}
            >
              {currency.code} - {currency.name}
            </Option>
          ))}
        </Dropdown>
      </Field>

      <Button
        appearance="secondary"
        icon={<ArrowSwap24Regular />}
        onClick={swapCurrencies}
      >
        Swap Currencies
      </Button>

      <Card
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <Text size={500}>
          {amount} {fromCurrency} =
        </Text>

        <Title2>
          {convertCurrency()} {toCurrency}
        </Title2>
      </Card>
    </Card>
  );
}