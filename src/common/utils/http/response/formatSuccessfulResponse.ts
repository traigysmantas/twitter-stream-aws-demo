import { HttpLambdaResponse } from 'common/interfaces/HttpLambdaResponse.interface';

export const formatSuccessfulResponse = (body: any, statusCode = 200): HttpLambdaResponse => {
  return {
    headers: { 'Content-Type': 'application/json' },
    statusCode,
    body: JSON.stringify(body),
  };
};