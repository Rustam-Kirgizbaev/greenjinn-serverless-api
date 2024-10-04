import { APIGatewayProxyEvent } from 'aws-lambda';
import { createResponse } from '../shared/utils/create-response';
import { BitstampDataProvider } from '../shared/providers/bitstamp.provider';
import { errorHandler } from '../shared/utils/error-handler';

async function getTickerValues(event: APIGatewayProxyEvent) {
  const symbol = event?.pathParameters?.symbol;

  if (!symbol) {
    return createResponse(400, { message: 'Symbol not provided.' });
  }

  const response = await BitstampDataProvider.getTickerValues(symbol);

  return createResponse(200, response);
}

export const handler = errorHandler(getTickerValues);
