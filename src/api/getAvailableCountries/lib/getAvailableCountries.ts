import { LambdaHttpError } from 'common/utils/http';

const CW_NAMESPACE = process.env.CW_NAMESPACE || 'tweetsFinal';
const CW_COUNTRY_METRIC = process.env.CW_COUNTRY_METRIC || 'TweetsByCountry';

export const getAvailableCountries = async (_, { cloudwatch }) => {

  const metrics = await cloudwatch
    .listMetrics({
      Namespace: CW_NAMESPACE,
      MetricName: CW_COUNTRY_METRIC,
    })
    .promise();

  console.log('metrics retrieved: ', metrics);

  const availableCountries = metrics.Metrics.map(({ Dimensions }) => {
    return Dimensions[0].Value === 'N/A' ? 'NONE': Dimensions[0].Value
  });

  if (availableCountries.length === 0) {
    throw new LambdaHttpError(
      404,
      `No tweets statistics by countryCode can be found`
    );
  }

  return { availableCountries };
};
