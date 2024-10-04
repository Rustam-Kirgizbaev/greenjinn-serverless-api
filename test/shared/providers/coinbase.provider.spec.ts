import { CoinbaseDataProvider } from '../../../shared/providers/coinbase.provider';
import { IProviderResponse } from '../../../shared/providers/interfaces/provider-response.interface';

global.fetch = jest.fn();

describe('CoinbaseDataProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the Bitcoin price successfully', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: {
          rates: {
            USD: '60000.00',
          },
        },
      }),
    };

    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    const expectedResponse: IProviderResponse = {
      provider: 'Coinbase',
      price: 60000.0,
    };

    const result = await CoinbaseDataProvider.getBitcoinPrice();

    expect(fetch).toHaveBeenCalledWith(
      'https://api.coinbase.com/v2/exchange-rates?currency=BTC',
    );
    expect(result).toEqual(expectedResponse);
  });

  it('should throw an error when the response is not ok for getBitcoinPrice', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
    };

    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(CoinbaseDataProvider.getBitcoinPrice()).rejects.toThrow(
      'HTTP error! status: 404',
    );
  });
});
