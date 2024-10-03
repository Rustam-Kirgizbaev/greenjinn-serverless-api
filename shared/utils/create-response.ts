export function createResponse(status_code: number, body: any) {
  return {
    statusCode: status_code,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}
