import { ReceiveMessageResult } from 'aws-sdk/clients/sqs';

export const handleReceivedMessages = async (sqs:AWS.SQS , messages: ReceiveMessageResult): Promise<void> => {
  let deleteParams = [];
    messages.Messages.forEach(msg => {
      console.log('message Found:', { msg });
      deleteParams.push({
        Id: msg.MessageId,
        ReceiptHandle: msg.ReceiptHandle,
      })
    });

    await sqs.deleteMessageBatch({
      QueueUrl: process.env.STREAM_CLOSE_QUEUE_URL,
      Entries: deleteParams,
    }).promise();    
}