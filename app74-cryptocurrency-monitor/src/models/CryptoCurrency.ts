export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}