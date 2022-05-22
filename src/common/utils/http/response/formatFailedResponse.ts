import { HttpLambdaResponse } from 'common/interfaces/HttpLambdaResponse.interface';

import { LambdaHttpError } from '../error/LambdaHttpError';

export const formatFailedResponse = (error: LambdaHttpError | Error): HttpLambdaResponse => {
  let statusCode = 500;
  let message = 'Unexpected error occured';

  if (error instanceof LambdaHttpError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  return {
    headers: { 'Content-Type': 'application/json' },
    statusCode,
    body: JSON.stringify({
      message,
    }),
  };
};