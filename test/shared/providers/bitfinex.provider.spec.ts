import { BitfinexDataProvider } from '../../../shared/providers/bitfinex.provider';
import { IProviderResponse } from '../../../shared/providers/interfaces/provider-response.interface';

global.fetch = jest.fn();

describe('BitfinexDataProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the Bitcoin price successfully', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([['tBTCUSD', '50000.00']]),
    };

    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    const expectedResponse: IProviderResponse = {
      provider: 'Bitfinex',
      price: 50000.0,
    };

    const result = await BitfinexDataProvider.getBitcoinPrice();

    expect(fetch).toHaveBeenCalledWith(
      'https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD',
    );
    expect(result).toEqual(expectedResponse);
  });

  it('should throw an error when the response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
    };

    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(BitfinexDataProvider.getBitcoinPrice()).rejects.toThrow(
      'HTTP error! status: 404',
    );
  });
});
