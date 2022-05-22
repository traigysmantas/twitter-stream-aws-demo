import { GetTweetsQueryParams } from '../../interfaces/GetTweetsQueryParams';
import { parseBase64ToDynamoDbKey } from '../utils';

// TODO: Refactor to reusable generic method.
export const getTweetsFromTable = (
  dynamodb: AWS.DynamoDB.DocumentClient,
  TableName: string,
  tableIndex: string,
  queryStringParameters: GetTweetsQueryParams
) => {
  const { limit, paginationKey, keyword } = queryStringParameters;

  if (!keyword) {
    return dynamodb
      .scan({
        TableName: TableName,
        ...(limit && { Limit: limit }),
        ...(paginationKey && { ExclusiveStartKey: parseBase64ToDynamoDbKey(paginationKey) }),
      })
      .promise();
  }

  return dynamodb
    .query({
      TableName: TableName,
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
