import AWS from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import lambdaHttpHandler from 'common/lambdaHttpHandler';

import StartStreamInput from './interfaces/StartStreamInput.interface';
import StartStreamSchema from './schemas/StartStream.schema';
import { startStream } from './lib/startStream';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const lambdaClient = new AWS.Lambda();

export const handler: APIGatewayProxyHandler = async (event) => {
  return lambdaHttpHandler<StartStreamInput>(event, startStream, { dynamodb, lambdaClient }, StartStreamSchema);
};