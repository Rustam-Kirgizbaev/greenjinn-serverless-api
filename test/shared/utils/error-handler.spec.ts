import { APIGatewayProxyEvent } from 'aws-lambda';
import { errorHandler } from '../../../shared/utils/error-handler';
import { createResponse } from '../../../shared/utils/create-response';

jest.mock('../../../shared/utils/create-response');

describe('errorHandler', () => {
  const mockHandler = jest.fn();
  const event: APIGatewayProxyEvent = {} as APIGatewayProxyEvent;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the handler and return its result', async () => {
    const result = { statusCode: 200, body: JSON.stringify({ message: 'OK' }) };
    mockHandler.mockResolvedValue(result);

    const wrappedHandler = errorHandler(mockHandler);
    const response = await wrappedHandler(event);

    expect(mockHandler).toHaveBeenCalledWith(event);
    expect(response).toEqual(result);
  });

  it('should return an error response when the handler throws an error', async () => {
    const errorMessage = 'Something went wrong!';
    mockHandler.mockRejectedValue(new Error(errorMessage));

    const wrappedHandler = errorHandler(mockHandler);
    const response = await wrappedHandler(event);

    expect(mockHandler).toHaveBeenCalledWith(event);
    expect(createResponse).toHaveBeenCalledWith(400, { message: errorMessage });
    expect(response).toEqual(createResponse(400, { message: errorMessage }));
  });
});
