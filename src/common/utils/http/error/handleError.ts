import { LambdaHttpError } from './LambdaHttpError';
import { formatFailedResponse } from '../response/handlers';

export const handleError = (err: LambdaHttpError | Error): any => {
  if (err instanceof LambdaHttpError) {
    const { statusCode, message } = err;
    console.error(`[FAILURE][StatusCode: ${statusCode}] message:`, message);
  } else {
    console.error(`[FAILURE][StatusCode: 500][Unhandled error] message:`, err);
  }

  return formatFailedResponse(err);
};


