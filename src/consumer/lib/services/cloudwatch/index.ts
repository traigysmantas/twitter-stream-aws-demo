import { Tweet } from 'common/interfaces/Tweet.inferface'

export const insertMetrics = (cloudwatch: AWS.CloudWatch, tweet: Tweet) => {
  return cloudwatch.putMetricData({
    MetricData: [
      {
        MetricName: 'TweetsByCountry',
        Dimensions: [
          {
            Name: 'country',
            Value: tweet.country
          }
        ],
        Timestamp: new Date(tweet.createdAt),
        Unit: 'Count',
        Value: 1.0
      },
      {
        MetricName: 'TweetsByKeyword',
        Dimensions: [
          {
            Name: 'keyword',
            Value: tweet.keyword,
          },
        ],
        Timestamp: new Date(tweet.createdAt),
        Unit: 'Count',
        Value: 1.0
      },
      {
        MetricName: 'TweetsWithCombinedMetrics',
        Dimensions: [
          {
            Name: 'keyword',
            Value: tweet.keyword,
          },
          {
            Name: 'countryCode',
            Value: tweet.countryCode
          }
        ],
        Timestamp: new Date(tweet.createdAt),
        Unit: 'Count',
        Value: 1.0
      },
      
    ],
    Namespace: 'tweets-test-2',
  }).promise()
}