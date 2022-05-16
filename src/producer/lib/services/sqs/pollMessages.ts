import { Context } from 'aws-lambda';
import { TweetStream } from 'twitter-api-v2';

import { isTriggerExitRequired } from '../../utils';
import { handleReceivedMessages } from './handleReceivedMessages';
import { longPollSQSMessage } from './longPollSQSMessage';

const TIMEOUT_TIME = 25000;

export const pollSqsMessages = async (stream: TweetStream, sqs: AWS.SQS, context: Context): Promise<void> => {
  try {
    console.log('[SQS Polling][Started]');

    const messages = await longPollSQSMessage(sqs);

    if (messages?.Messages) {
      await handleReceivedMessages(sqs, messages);
      console.log('[SQS Polling][Message Received & Handled] Closing Stream.');
      stream.close();
      return;
    } 
    
    if (isTriggerExitRequired(context, TIMEOUT_TIME)) {
      console.log('[SQS Polling] No close event received. Closing Stream gracefully.')
      stream.close()
      return;
    } 

    console.log('[SQS Polling] No messages received. Polling Again');
    pollSqsMessages(stream, sqs, context);

  } catch (err) {
    console.log('[SQS Polling][FAILURE][Closing Stream][ERROR WHILE POLLING]', err);
    stream.close();
  }
}