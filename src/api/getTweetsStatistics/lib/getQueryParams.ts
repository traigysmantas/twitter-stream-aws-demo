import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaHttpError } from 'common/utils/http/error/LambdaHttpError';

import { StatisticsQueryParams } from '../interfaces/StatisticsQueryParams';

export const getQueryParams = (
  event: APIGatewayProxyEvent
): StatisticsQueryParams => {
  const start = event?.queryStringParameters?.startTime;
  const end = event?.queryStringParameters?.endTime;
  const _countryCode = event?.queryStringParameters?.countryCode;

  console.log('Incoming params', { start, end, _countryCode });

  if (!start) throw new LambdaHttpError(400, 'Please provide startTime');
  if (!end) throw new LambdaHttpError(400, 'Please provide endTime');
  if (!_countryCode)
    throw new LambdaHttpError(400, 'Please provide countryCode');

  const startTime = getDate(
    start,
    'startTime cannot be converted to ISO string'
  );
  const endTime = getDate(end, 'endTime cannot be converted to ISO string');

  const countryCode = validateCountryCode(_countryCode);

  return {
    startTime,
    endTime,
    countryCode: countryCode ? countryCode.toUpperCase() : undefined,
  };
};

const getDate = (date: string, errMessage: string) => {
  try {
    return new Date(date);
  } catch (err) {
    console.log('[Statistics][Conversion to Date][FAILURE]', err);
    throw new LambdaHttpError(400, errMessage);
  }
};

const validateCountryCode = (countryCode: string): string => {
  if (countryCode.toUpperCase() === 'NONE' || countryCode.length === 2) {
    return countryCode; 
  }

  throw new LambdaHttpError(400, 'Provided countryCode is incorrect');
}