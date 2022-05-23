import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import lambdaHttpHandler from 'common/lambdaHttpHandler';

import { GetTweetsParams } from './interfaces/GetTweetsParams.interface';
import { getTweets } from './lib/getTweets';
import GetTweetsSchema from './schemas/GetTweets.schema';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event) => {
  return lambdaHttpHandler<GetTweetsParams>(event, getTweets, { dynamodb }, GetTweetsSchema);
};
