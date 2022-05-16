import AWS from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { handleError } from 'common/utils/http/error/handleError';
import { formatSuccessfulResponse } from 'common/utils/http/response/handlers';

import { getQueryParams } from './lib/getQueryParams';
import { getDimensions } from './lib/getDimensions';
import { LambdaHttpError } from 'common/utils/http/error/LambdaHttpError';

const cloudwatch = new AWS.CloudWatch();
const CW_NAMESPACE = process.env.CW_NAMESPACE || 'tweetsFinal';
const CW_COUNTRY_METRIC = process.env.CW_COUNTRY_METRIC || 'TweetsByCountry'

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    
    const { startTime, endTime, countryCode } = getQueryParams(event);

    const dimensions = await getDimensions(countryCode);

    const metrics = await cloudwatch.getMetricStatistics({
      Namespace: CW_NAMESPACE,
      MetricName: CW_COUNTRY_METRIC,
      Dimensions: dimensions,
      StartTime: startTime,
      EndTime: endTime,
      Statistics: [ "Sum" ],
      Period: 3600,
    }).promise();

    console.log('metrics retrieved: ', metrics);

    const tweetsCount =  metrics.Datapoints?.[0]?.Sum;
    
    if (!tweetsCount) {
      throw new LambdaHttpError(404, `No tweets statistics found by country countryCode: ${countryCode}`);
    }

    return formatSuccessfulResponse({ tweetsCount: tweetsCount });
  } catch (err) {
    return handleError(err);
  }
}