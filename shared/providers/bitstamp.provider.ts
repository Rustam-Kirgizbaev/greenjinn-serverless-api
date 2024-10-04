import { IProviderResponse } from './interfaces/provider-response.interface';

export class BitstampDataProvider {
  private static base_url = 'https://www.bitstamp.net/api/v2';

  static async getBitcoinPrice(): Promise<IProviderResponse> {
    const response = await fetch(
      `${BitstampDataProvider.base_url}/ticker/btcusd`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      provider: 'Bitstamp',
      price: parseFloat(data.last),
    };
  }

  static async getTradingPairsInfo() {
    const response = await fetch(
      `${BitstampDataProvider.base_url}/trading-pairs-info`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.map((pair: any) => {
      return {
        name: pair.name,
        symbol: pair.url_symbol,
        description: pair.description,
      };
    });
  }

  static async getTickerValues(currency_pair: string) {
    const response = await fetch(
      `${BitstampDataProvider.base_url}/ticker/${currency_pair}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  }
}
