import { APIGatewayProxyHandler } from 'aws-lambda';
import lambdaHttpHandler from 'common/lambdaHttpHandler';

import { stopStream } from './lib/stopStream';

export const handler: APIGatewayProxyHandler = async (event) => {
  return lambdaHttpHandler(event, stopStream);
};
