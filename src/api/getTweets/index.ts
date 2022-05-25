import { APIGatewayProxyHandler } from 'aws-lambda';
import lambdaHttpHandler from 'common/lambdaHttpHandler';

import GetTweetsParams from './interfaces/GetTweetsParams.interface';
import { getTweets } from './lib/getTweets';
import GetTweetsSchema from './schemas/GetTweets.schema';

export const handler: APIGatewayProxyHandler = async (event) => {
  return lambdaHttpHandler<GetTweetsParams>(event, getTweets, GetTweetsSchema);
};
