import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createResponse } from './create-response';

type Handler = (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

export function errorHandler(handler: Handler): Handler {
  return async (
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> => {
    try {
      return await handler(event);
    } catch (error: any) {
      return createResponse(400, { message: error.message });
    }
  };
}
