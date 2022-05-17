export const formatSuccessfulResponse = (body: any, statusCode = 200) => {
  return {
    headers: { 'Content-Type': 'application/json' },
    statusCode,
    body: JSON.stringify(body),
  };
};