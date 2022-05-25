import HttpLambdaResponse from 'common/interfaces/HttpLambdaResponse.interface';
import JsonObject from 'common/interfaces/JsonObject.interface';

export const formatSuccessfulResponse = (body: JsonObject, statusCode = 200): HttpLambdaResponse => {
  return {
    headers: { 'Content-Type': 'application/json' },
    statusCode,
    body: JSON.stringify(body),
  };
};