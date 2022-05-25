import AWS from 'aws-sdk';

export const cloudwatch = new AWS.CloudWatch();
export const dynamodb = new AWS.DynamoDB.DocumentClient();
export const lambdaClient = new AWS.Lambda();
export const sqs = new AWS.SQS();