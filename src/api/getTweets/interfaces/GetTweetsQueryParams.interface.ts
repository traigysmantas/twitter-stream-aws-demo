export interface GetTweetsQueryParams {
  keyword?: string;
  limit?: 5 | 10 | 20 | 50;
  paginationKey?: string;
}