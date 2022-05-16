export const sendCloseMessage = (sqs: AWS.SQS) => {
  return sqs
  .sendMessage({
    MessageBody: JSON.stringify({
      streamId: '1',
      action: 'CLOSE',
    }),
    QueueUrl: process.env.STREAM_CLOSE_QUEUE_URL,
  })
  .promise();
}