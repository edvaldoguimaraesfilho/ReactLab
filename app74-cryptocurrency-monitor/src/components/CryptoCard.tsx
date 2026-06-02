import {
  Card,
  Text,
  Title3,
  Badge,
} from "@fluentui/react-components";

import type { CryptoCurrency } from "../models/CryptoCurrency";

interface CryptoCardProps {
  crypto: CryptoCurrency;
}

export function CryptoCard({
  crypto,
}: CryptoCardProps) {
  const positive =
    crypto.price_change_percentage_24h >= 0;

  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>
        {crypto.name}
      </Title3>

      <Text>
        Symbol: {crypto.symbol.toUpperCase()}
      </Text>

      <Text>
        Rank: #{crypto.market_cap_rank}
      </Text>

      <Text>
        Price: $
        {crypto.current_price.toLocaleString()}
      </Text>

      <Badge
        appearance={
          positive ? "filled" : "outline"
        }
      >
        {crypto.price_change_percentage_24h.toFixed(2)}%
      </Badge>
    </Card>
  );
}