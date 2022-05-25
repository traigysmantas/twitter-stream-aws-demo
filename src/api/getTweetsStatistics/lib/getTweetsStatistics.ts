import { cloudwatch } from 'common/services/instances';
import { LambdaHttpError } from 'common/utils/http';

import { TweetsStatisticsParams } from '../interfaces/TweetsStatisticsParams';

import { getDimensions } from './getDimensions';

const CW_NAMESPACE = process.env.CW_NAMESPACE || 'tweetsFinal';
const CW_COUNTRY_METRIC = process.env.CW_COUNTRY_METRIC || 'TweetsByCountry';

export const getTweetsStatistics = async (
  { startTime, endTime, countryCode }: TweetsStatisticsParams,
) => {
  console.log('getTweetsStatistics params: ', {
    startTime,
    endTime,
    countryCode,
  });

  const dimensions = await getDimensions(countryCode);

  const metrics = await cloudwatch
    .getMetricStatistics({
      Namespace: CW_NAMESPACE,
      MetricName: CW_COUNTRY_METRIC,
      Dimensions: dimensions,
      StartTime: startTime,
      EndTime: endTime,
      Statistics: ['Sum'],
      Period: 3600,
    })
    .promise();

  console.log('metrics retrieved: ', metrics);

  const tweetsCount = metrics.Datapoints?.[0]?.Sum;

  if (!tweetsCount) {
    throw new LambdaHttpError(
      404,
      `No tweets statistics found by country countryCode: ${countryCode}`
    );
  }

  return { tweetsCount };
};
