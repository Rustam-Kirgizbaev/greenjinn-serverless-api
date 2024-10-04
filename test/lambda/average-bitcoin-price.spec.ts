import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../lambda/average-bitcoin-price';
import { BitfinexDataProvider } from '../../shared/providers/bitfinex.provider';
import { BitstampDataProvider } from '../../shared/providers/bitstamp.provider';
import { CoinbaseDataProvider } from '../../shared/providers/coinbase.provider';
import { createResponse } from '../../shared/utils/create-response';

jest.mock('../../shared/providers/bitfinex.provider');
jest.mock('../../shared/providers/bitstamp.provider');
jest.mock('../../shared/providers/coinbase.provider');

describe('getAverageBitcoinPrice Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the average Bitcoin price from all providers', async () => {
    const event = {} as APIGatewayProxyEvent;

    (BitfinexDataProvider.getBitcoinPrice as jest.Mock).mockResolvedValue({
      provider: 'Bitfinex',
      price: 60000.0,
    });
    (BitstampDataProvider.getBitcoinPrice as jest.Mock).mockResolvedValue({
      provider: 'Bitstamp',
      price: 61000.0,
    });
    (CoinbaseDataProvider.getBitcoinPrice as jest.Mock).mockResolvedValue({
      provider: 'Coinbase',
      price: 62000.0,
    });

    const expectedResponse = createResponse(200, {
      ticker: 'BTCUSD',
      average_price: 61000.0,
      providers: [
        { provider: 'Bitfinex', price: 60000.0 },
        { provider: 'Bitstamp', price: 61000.0 },
        { provider: 'Coinbase', price: 62000.0 },
      ],
    });

    const result = await handler(event);

    expect(result).toEqual(expectedResponse);
  });

  it('should return a 400 error if any provider fails', async () => {
    const event = {} as APIGatewayProxyEvent;

    (BitfinexDataProvider.getBitcoinPrice as jest.Mock).mockResolvedValue({
      provider: 'Bitfinex',
      price: 60000.0,
    });
    (BitstampDataProvider.getBitcoinPrice as jest.Mock).mockResolvedValue(null);
    (CoinbaseDataProvider.getBitcoinPrice as jest.Mock).mockResolvedValue({
      provider: 'Coinbase',
      price: 62000.0,
    });

    const expectedResponse = createResponse(400, {
      message: 'Error while retrieving data from providers.',
    });

    const result = await handler(event);

    expect(result).toEqual(expectedResponse);
  });

  it('should return a 400 error if all providers fail', async () => {
    const event = {} as APIGatewayProxyEvent;

    (BitfinexDataProvider.getBitcoinPrice as jest.Mock).mockResolvedValue(null);
    (BitstampDataProvider.getBitcoinPrice as jest.Mock).mockResolvedValue(null);
    (CoinbaseDataProvider.getBitcoinPrice as jest.Mock).mockResolvedValue(null);

    const expectedResponse = createResponse(400, {
      message: 'Error while retrieving data from providers.',
    });

    const result = await handler(event);

    expect(result).toEqual(expectedResponse);
  });
});
