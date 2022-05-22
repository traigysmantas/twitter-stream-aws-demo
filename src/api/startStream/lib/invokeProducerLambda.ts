export const invokeProducerLambda = (lambdaClient: AWS.Lambda, keyword: string) => {
  return lambdaClient.invoke({
    FunctionName: process.env.PRODUCER_FUNCTION,
    InvocationType: 'Event',
    Payload: JSON.stringify({ keyword }),
  }).promise();
}