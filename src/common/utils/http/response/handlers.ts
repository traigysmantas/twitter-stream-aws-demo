import { LambdaHttpError } from '../error/LambdaHttpError';

export const formatFailedResponse = (error: LambdaHttpError | Error): any => {
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

export const formatSuccessfulResponse = (body: any, statusCode = 200) => {
  return {
    headers: { 'Content-Type': 'application/json' },
    statusCode,
    body: JSON.stringify(body),
  };
};