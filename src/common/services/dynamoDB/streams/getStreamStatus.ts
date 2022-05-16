import { StreamItem } from 'common/interfaces/StreamItem.interface';

export const getStreamStatus = async (dynamodb: AWS.DynamoDB.DocumentClient) => {
  const itemResponse = await dynamodb.get({
    TableName: process.env.STATUS_TABLE_NAME,
    ConsistentRead: true,
    Key: {
      // hardcoded because only single twitter stream is available per account.
      'streamId': 1,
    },
    ProjectionExpression: 'currentStatus',
  }).promise();

  // TODO: Refactor!
  return itemResponse.Item as unknown as StreamItem;
}