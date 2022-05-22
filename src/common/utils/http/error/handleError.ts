import { formatFailedResponse } from '../response/formatFailedResponse';

import { LambdaHttpError } from './LambdaHttpError';

export const handleError = (err: LambdaHttpError | Error): any => {
  if (err instanceof LambdaHttpError) {
    const { statusCode, message } = err;
    console.error(`[FAILURE][StatusCode: ${statusCode}] message:`, message);
  } else {
    console.error(`[FAILURE][StatusCode: 500][Unhandled error] message:`, err);
  }

  return formatFailedResponse(err);
};


