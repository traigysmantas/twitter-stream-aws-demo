export default interface HttpLambdaResponse {
  headers: {
    [key: string]: string;
  };
  statusCode: number;
  body: string;
}