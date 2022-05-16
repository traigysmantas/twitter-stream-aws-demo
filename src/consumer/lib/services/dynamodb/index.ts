import { WriteRequest } from 'aws-sdk/clients/dynamodb';

export const insertTweets = (dynamodb: AWS.DynamoDB.DocumentClient, tweetsTable: string, dynamoDbItems: WriteRequest[]) => {
  return dynamodb.batchWrite({
    RequestItems: {
      [tweetsTable]: dynamoDbItems
    }
  }).promise()
}