import { BitstampDataProvider } from '../../../shared/providers/bitstamp.provider';
import { IProviderResponse } from '../../../shared/providers/interfaces/provider-response.interface';

global.fetch = jest.fn();

describe('BitstampDataProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the Bitcoin price successfully', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ last: '60000.00' }),
    };

    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    const expectedResponse: IProviderResponse = {
      provider: 'Bitstamp',
      price: 60000.0,
    };

    const result = await BitstampDataProvider.getBitcoinPrice();

    expect(fetch).toHaveBeenCalledWith(
      'https://www.bitstamp.net/api/v2/ticker/btcusd',
    );
    expect(result).toEqual(expectedResponse);
  });

  it('should throw an error when the response is not ok for getBitcoinPrice', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
    };

    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(BitstampDataProvider.getBitcoinPrice()).rejects.toThrow(
      'HTTP error! status: 404',
    );
  });

  it('should fetch trading pairs info successfully', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([
        {
          name: 'BTC/USD',
          url_symbol: 'btcusd',
          description: 'Bitcoin to USD',
        },
        {
          name: 'ETH/USD',
          url_symbol: 'ethusd',
          description: 'Ethereum to USD',
        },
      ]),
    };

    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    const expectedResponse = [
      { name: 'BTC/USD', symbol: 'btcusd', description: 'Bitcoin to USD' },
      { name: 'ETH/USD', symbol: 'ethusd', description: 'Ethereum to USD' },
    ];

    const result = await BitstampDataProvider.getTradingPairsInfo();

    expect(fetch).toHaveBeenCalledWith(
      'https://www.bitstamp.net/api/v2/trading-pairs-info',
    );
    expect(result).toEqual(expectedResponse);
  });

  it('should throw an error when the response is not ok for getTradingPairsInfo', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
    };

    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(BitstampDataProvider.getTradingPairsInfo()).rejects.toThrow(
      'HTTP error! status: 404',
    );
  });

  it('should fetch ticker values successfully', async () => {
    const currency_pair = 'btcusd';
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        last: '60000.00',
        bid: '59000.00',
        ask: '61000.00',
      }),
    };

    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    const expectedResponse = {
      last: '60000.00',
      bid: '59000.00',
      ask: '61000.00',
    };

    const result = await BitstampDataProvider.getTickerValues(currency_pair);

    expect(fetch).toHaveBeenCalledWith(
      `https://www.bitstamp.net/api/v2/ticker/${currency_pair}`,
    );
    expect(result).toEqual(expectedResponse);
  });

  it('should throw an error when the response is not ok for getTickerValues', async () => {
    const currency_pair = 'btcusd';
    const mockResponse = {
      ok: false,
      status: 404,
    };

    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(
      BitstampDataProvider.getTickerValues(currency_pair),
    ).rejects.toThrow('HTTP error! status: 404');
  });
});
