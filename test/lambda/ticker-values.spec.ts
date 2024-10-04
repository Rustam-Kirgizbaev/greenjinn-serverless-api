import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../lambda/ticker-values';
import { BitstampDataProvider } from '../../shared/providers/bitstamp.provider';
import { createResponse } from '../../shared/utils/create-response';

jest.mock('../../shared/providers/bitstamp.provider');

describe('getTickerValues Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return ticker values successfully', async () => {
    const event = {
      pathParameters: { symbol: 'btcusd' },
    } as unknown as APIGatewayProxyEvent;

    (BitstampDataProvider.getTickerValues as jest.Mock).mockResolvedValue({
      last: '60000.00',
      high: '61000.00',
      low: '59000.00',
      volume: '100',
    });

    const expectedResponse = createResponse(200, {
      last: '60000.00',
      high: '61000.00',
      low: '59000.00',
      volume: '100',
    });

    const result = await handler(event);

    expect(result).toEqual(expectedResponse);
  });

  it('should return a 400 error if symbol is not provided', async () => {
    const event = {} as APIGatewayProxyEvent;

    const expectedResponse = createResponse(400, {
      message: 'Symbol not provided.',
    });

    const result = await handler(event);

    expect(result).toEqual(expectedResponse);
  });

  it('should handle errors from BitstampDataProvider.getTickerValues', async () => {
    const event = {
      pathParameters: { symbol: 'btcusd' },
    } as unknown as APIGatewayProxyEvent;

    (BitstampDataProvider.getTickerValues as jest.Mock).mockRejectedValue(
      new Error('API error'),
    );

    const expectedResponse = createResponse(400, { message: 'API error' });

    const result = await handler(event);

    expect(result).toEqual(expectedResponse);
  });
});
