import { TwitterApi } from 'twitter-api-v2';

export default interface LambdaServices {
  dynamodb?: AWS.DynamoDB.DocumentClient,
  cloudwatch?: AWS.CloudWatch,
  sqs?: AWS.SQS,
  twitterClient?: TwitterApi
}