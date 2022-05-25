import { APIGatewayProxyHandler } from 'aws-lambda';
import lambdaHttpHandler from 'common/lambdaHttpHandler';

import StartStreamInput from './interfaces/StartStreamInput.interface';
import StartStreamSchema from './schemas/StartStream.schema';
import { startStream } from './lib/startStream';

export const handler: APIGatewayProxyHandler = async (event) => {
  return lambdaHttpHandler<StartStreamInput>(event, startStream, StartStreamSchema);
};