import { APIGatewayProxyEvent } from "aws-lambda";
import { BitfinexDataProvider } from "../shared/providers/bitfinex.provider";
import { BitstampDataProvider } from "../shared/providers/bitstamp.provider";
import { CoinbaseDataProvider } from "../shared/providers/coinbase.provider";
import { IProviderResponse } from "../shared/providers/interfaces/provider-response.interface";
import { createResponse } from "../shared/utils/create-response";
import { errorHandler } from "../shared/utils/error-handler";

async function getAverageBitcoinPrice(event: APIGatewayProxyEvent) {
  const providers = [
    BitfinexDataProvider.getBitcoinPrice,
    BitstampDataProvider.getBitcoinPrice,
    CoinbaseDataProvider.getBitcoinPrice,
  ];

  const results: (IProviderResponse | null)[] = await Promise.all(
    providers.map(async (provider) => {
      try {
        return await provider();
      } catch (error: any) {
        // TODO: errors should properly be logged for debugging!
        return null;
      }
    })
  );

  const valid_results = results.filter((result) => result !== null);

  if (valid_results.length !== providers.length) {
    return createResponse(400, {
      message: "Error while retrieving data from providers.",
    });
  }

  return createResponse(200, {
    ticker: "BTCUSD",
    average_price:
      valid_results.reduce((sum, result) => sum + result!.price, 0) /
      valid_results.length,
    providers: valid_results,
  });
}

export const handler = errorHandler(getAverageBitcoinPrice);
