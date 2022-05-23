import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import lambdaHttpHandler from 'common/lambdaHttpHandler';

import { stopStream } from './lib/stopStream';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS();

export const handler: APIGatewayProxyHandler = async (event) => {
  return lambdaHttpHandler(event, stopStream, { dynamodb, sqs });
};
