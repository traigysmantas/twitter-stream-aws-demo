import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaHttpError } from 'common/utils/http/error/LambdaHttpError';
import { GetTweetsQueryParams } from '../interfaces/GetTweetsQueryParams';

export const getQueryParams = (event: APIGatewayProxyEvent): GetTweetsQueryParams  => {
  const keyword = event.queryStringParameters?.keyword;
  const limit = event?.queryStringParameters?.limit;
  const paginationKey = event?.queryStringParameters?.paginationKey;

  if (limit) checkLimit(limit);

  return {
    keyword,
    limit: limit ? parseInt(limit): null, 
    paginationKey: paginationKey ? parseBase64(paginationKey): null,
  }
}

const checkLimit = (limit: string) => {
  const limitValues = [5, 10, 20, 50];
  const limitNr = parseInt(limit);
  if (isNaN(limitNr) || !limitValues.includes(limitNr)) {
    throw new LambdaHttpError(
      400,
      'parameter must be number of values: 5, 10, 20 or 50'
    );
  }
  return limitNr;
};

const parseBase64 = (base64EncodedString: string) => {
  try {
    return JSON.parse(Buffer.from(base64EncodedString, 'base64url').toString());
  } catch (err) {
    console.log('[GET TWEETS][PARSE VALUE][FAILURE]', err);
    throw new LambdaHttpError(400, 'Provided incorrect paginationKey');
  }
}