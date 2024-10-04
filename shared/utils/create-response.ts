export function createResponse(status_code: number, body: any) {
  return {
    statusCode: status_code,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  };
}
