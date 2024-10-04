import { IProviderResponse } from './interfaces/provider-response.interface';

export class CoinbaseDataProvider {
  private static base_url = 'https://api.coinbase.com/v2/exchange-rates';

  static async getBitcoinPrice(): Promise<IProviderResponse> {
    const response = await fetch(
      `${CoinbaseDataProvider.base_url}?currency=BTC`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      provider: 'Coinbase',
      price: parseFloat(data.data.rates['USD']),
    };
  }
}
