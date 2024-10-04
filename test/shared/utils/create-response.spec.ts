import { createResponse } from '../../../shared/utils/create-response';

describe('createResponse', () => {
  it('should return a valid response object', () => {
    const statusCode = 200;
    const body = { message: 'Success' };

    const response = createResponse(statusCode, body);

    expect(response).toEqual({
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(body),
    });
  });

  it('should handle different status codes and bodies', () => {
    const statusCode = 400;
    const body = { message: 'Error occured' };

    const response = createResponse(statusCode, body);

    expect(response).toEqual({
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(body),
    });
  });
});
