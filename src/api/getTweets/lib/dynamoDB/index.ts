import { GetTweetsQueryParams } from '../../interfaces/GetTweetsQueryParams';

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
        ...(paginationKey && { ExclusiveStartKey: paginationKey }),
      })
      .promise();
  }

  return dynamodb
    .query({
      TableName: TableName,
      IndexName: tableIndex,
      ...(limit && { Limit: limit }),
      ...(paginationKey && { ExclusiveStartKey: paginationKey }),
      KeyConditionExpression: 'keyword = :keyword',
      ExpressionAttributeValues: {
        ':keyword': keyword,
      },
    })
    .promise();
};
