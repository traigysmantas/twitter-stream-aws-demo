import AWS from 'aws-sdk';
import { TwitterApi } from 'twitter-api-v2';
import { Context } from 'aws-lambda';
import { updateStreamStatus } from 'common/services/dynamoDB/streams';

import { ProducerEvent } from './interfaces/ProducerEvent';
import { pollSqsMessages } from './lib/services/sqs/pollMessages';
import { handleTwitterStreamEvents, initSearchStream, setupStreamRules } from './lib/services/twitter';

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS();

export const produce = async (event: ProducerEvent, context: Context): Promise<void> => {
  const stream = await initSearchStream(twitterClient);
  try {
    console.log('Incoming event:', event);
    const { keyword } = event;

    // 1. setup Twitter Stream Rules.
    await setupStreamRules(twitterClient, keyword);

    // 2. Continously Poll for messages to SQS queue (Long Polling. When message received -> stop Queue & close stream)
    // Better solution: Redis Pub/Sub.
    pollSqsMessages(stream, sqs, context);

    // 3. Twitter
    await handleTwitterStreamEvents(stream, dynamodb, sqs, keyword);

  } catch (err) {
    await updateStreamStatus(dynamodb, 'OFF');
    console.error('[PRODUCER][FAILURE] Unexpected error:', err);
    console.error('[PRODUCER][FAILURE] Destroying stream & updating table');
    stream.destroy();
    // if error -> update table to set it to OFF ?
  }
}