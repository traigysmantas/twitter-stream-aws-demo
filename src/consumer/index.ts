import { SQSHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import { Tweet } from 'common/interfaces/Tweet.inferface';
import { insertMetrics } from './lib/services/cloudwatch';
import { insertTweets } from './lib/services/dynamodb';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const cloudwatch = new AWS.CloudWatch();

const TWEETS_TABLE = process.env.TWEETS_TABLE_NAME;

export const consume: SQSHandler = async (event) => {

  console.log('[Consumer] # Of Tweets retrieved: ', event.Records.length);

  const dynamoDbItems = [];

  for await (const record of event.Records) {
    const tweet = JSON.parse(record.body) as Tweet;
    console.log('[Consumer] Retrieved tweet:', tweet);

    dynamoDbItems.push({
      PutRequest: {
        Item: tweet,
      }
    })

    // TODO: Refactor to insert metrics in batches.
    await insertMetrics(cloudwatch, tweet)
    .then(() => console.log('[Consumer][SUCCESS][CloudWatch] Tweet Metrics added succesfully'))
  } 

  await insertTweets(dynamodb, TWEETS_TABLE, dynamoDbItems)
  .then(() => console.log('[Consumer][SUCCESS] Tweet(s) added succesfully'))
}