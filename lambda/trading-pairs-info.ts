import { APIGatewayProxyEvent } from "aws-lambda";
import { BitstampDataProvider } from "../shared/providers/bitstamp.provider";
import { createResponse } from "../shared/utils/create-response";
import { errorHandler } from "../shared/utils/error-handler";

async function getTradingPairsInfo(event: APIGatewayProxyEvent) {
  const pairs = await BitstampDataProvider.getTradingPairsInfo();

  return createResponse(200, pairs);
}

export const handler = errorHandler(getTradingPairsInfo);
