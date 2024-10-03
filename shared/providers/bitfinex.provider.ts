import { IProviderResponse } from "./interfaces/provider-response.interface";

export class BitfinexDataProvider {
  private static base_url = "https://api-pub.bitfinex.com/v2";

  static async getBitcoinPrice(): Promise<IProviderResponse> {
    const response = await fetch(
      `${BitfinexDataProvider.base_url}/tickers?symbols=tBTCUSD`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      provider: "Bitfinex",
      price: parseFloat(data[0][1]),
    };
  }
}
