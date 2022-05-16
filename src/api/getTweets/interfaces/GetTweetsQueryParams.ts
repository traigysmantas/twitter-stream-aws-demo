export interface GetTweetsQueryParams {
  keyword: string;
  limit: number | null;
  paginationKey: AWS.DynamoDB.DocumentClient.Key | null;
}