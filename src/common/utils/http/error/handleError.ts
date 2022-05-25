import HttpLambdaResponse from 'common/interfaces/HttpLambdaResponse.interface';

import { formatFailedResponse } from '../response/formatFailedResponse';

import { LambdaHttpError } from './LambdaHttpError';

export const handleError = (err: LambdaHttpError | Error): HttpLambdaResponse => {
  if (err instanceof LambdaHttpError) {
    const { statusCode, message } = err;
    console.error(`[FAILURE][StatusCode: ${statusCode}] message:`, message);
  } else {
    console.error(`[FAILURE][StatusCode: 500][Unhandled error] message:`, err);
  }

  return formatFailedResponse(err);
};


