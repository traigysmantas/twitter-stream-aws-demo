export default interface LambdaServices {
  dynamodb?: AWS.DynamoDB.DocumentClient,
  cloudwatch?: AWS.CloudWatch,
  sqs?: AWS.SQS,
  lambdaClient?: AWS.Lambda
}