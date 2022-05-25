import { APIGatewayProxyHandler } from 'aws-lambda';
import lambdaHttpHandler from 'common/lambdaHttpHandler';

import { getAvailableCountries } from './lib/getAvailableCountries';

export const handler: APIGatewayProxyHandler = async (event) => {
  return lambdaHttpHandler(event, getAvailableCountries);
};
