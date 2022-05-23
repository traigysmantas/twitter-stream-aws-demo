import { GetTweetsParams } from '../../interfaces/GetTweetsParams.interface';
import { parseBase64ToDynamoDbKey } from '../utils';

// TODO: Refactor to reusable generic method.
export const getTweetsFromTable = (
  dynamodb: AWS.DynamoDB.DocumentClient,
  TableName: string,
  tableIndex: string,
  queryStringParameters: GetTweetsParams
) => {
  const { limit, paginationKey, keyword } = queryStringParameters;

  if (!keyword) {
    return dynamodb
      .scan({
        TableName,
        ...(limit && { Limit: limit }),
        ...(paginationKey && { ExclusiveStartKey: parseBase64ToDynamoDbKey(paginationKey) }),
      })
      .promise();
  }

  return dynamodb
    .query({
      TableName,
      IndexName: tableIndex,
      ...(limit && { Limit: limit }),
      ...(paginationKey && { ExclusiveStartKey: parseBase64ToDynamoDbKey(paginationKey) }),
      KeyConditionExpression: 'keyword = :keyword',
      ExpressionAttributeValues: {
        ':keyword': keyword,
      },
    })
    .promise();
};
