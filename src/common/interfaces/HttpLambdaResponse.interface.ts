import { JsonObject } from './JsonObject.interface';

export interface HttpLambdaResponse {
  headers: {
    [key: string]: string;
  };
  statusCode: number;
  body: string;
}