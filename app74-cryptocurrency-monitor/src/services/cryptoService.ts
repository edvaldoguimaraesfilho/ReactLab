import type { CryptoCurrency } from "../models/CryptoCurrency";

export async function getCryptocurrencies(): Promise<CryptoCurrency[]> {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cryptocurrency data");
  }

  return response.json();
}