import { ReceiveMessageResult } from 'aws-sdk/clients/sqs'

export const longPollSQSMessage = async (sqs: AWS.SQS): Promise<ReceiveMessageResult> => {
  return sqs.receiveMessage({
    QueueUrl: process.env.STREAM_CLOSE_QUEUE_URL,
    WaitTimeSeconds: 20,
  }).promise()
}