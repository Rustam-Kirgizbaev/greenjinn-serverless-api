import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../lambda/trading-pairs-info';
import { BitstampDataProvider } from '../../shared/providers/bitstamp.provider';
import { createResponse } from '../../shared/utils/create-response';

jest.mock('../../shared/providers/bitstamp.provider');

describe('getTradingPairsInfo Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return trading pairs info successfully', async () => {
    const event = {} as APIGatewayProxyEvent;

    const mockPairs = [
      { name: 'BTC/USD', url_symbol: 'btcusd', description: 'Bitcoin to USD' },
      { name: 'ETH/USD', url_symbol: 'ethusd', description: 'Ethereum to USD' },
    ];

    (BitstampDataProvider.getTradingPairsInfo as jest.Mock).mockResolvedValue(
      mockPairs,
    );

    const expectedResponse = createResponse(200, mockPairs);

    const result = await handler(event);

    expect(result).toEqual(expectedResponse);
  });

  it('should handle errors from BitstampDataProvider.getTradingPairsInfo', async () => {
    const event = {} as APIGatewayProxyEvent;

    (BitstampDataProvider.getTradingPairsInfo as jest.Mock).mockRejectedValue(
      new Error('API error'),
    );

    const expectedResponse = createResponse(400, { message: 'API error' });

    const result = await handler(event);

    expect(result).toEqual(expectedResponse);
  });
});
