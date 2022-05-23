import AWS from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import lambdaHttpHandler from 'common/lambdaHttpHandler';

import { getTweetsStatistics } from './lib/getTweetsStatistics';
import { TweetsStatisticsParams } from './interfaces/TweetsStatisticsParams';
import TweetsStatisticsSchema from './schemas/TweetsStatistics.schema';

const cloudwatch = new AWS.CloudWatch();

export const handler: APIGatewayProxyHandler = async (event) => {
  return lambdaHttpHandler<TweetsStatisticsParams>(event, getTweetsStatistics, { cloudwatch }, TweetsStatisticsSchema);
};