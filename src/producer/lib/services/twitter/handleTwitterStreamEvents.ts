import { ETwitterStreamEvent, TweetStream, TweetV2SingleStreamResult } from 'twitter-api-v2';
import { updateStreamStatus } from 'common/services/dynamoDB/streams';

import { transformTweet } from '../../transformTweet';

export const handleTwitterStreamEvents = (stream: TweetStream, dynamodb: AWS.DynamoDB.DocumentClient, sqs: AWS.SQS, keyword: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    let count = 0;

    stream
    .on(ETwitterStreamEvent.Connected, () => console.log('Stream Connected!'))
    .on(ETwitterStreamEvent.ConnectionClosed, async () => {
      console.log('Closing Twitter Stream Connection.');
      await updateStreamStatus(dynamodb, 'OFF');

      return resolve;
    })
    .on(ETwitterStreamEvent.Error, async (err) => {
      console.log('[STREAM][ERROR] Twitter stream error', err);
      await updateStreamStatus(dynamodb, 'OFF');

      return resolve;
    })
    .on(
      ETwitterStreamEvent.Data,
      async (eventData: TweetV2SingleStreamResult) => {
        count++;
        console.log('Got tweet. Current tweet count:', {
          count,
          tweetId: eventData.data.id,
        });

        sqs
        .sendMessage({
          MessageBody: JSON.stringify(transformTweet(keyword, eventData)),
          QueueUrl: process.env.TWEETS_QUEUE_URL,
          MessageGroupId: 'tweets',
        }).promise().catch(err => console.log('[STREAM][DATA][SQS][FAILURE]', err));
      }
    );

    stream.connect();
  });
}