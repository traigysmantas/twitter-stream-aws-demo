import { LambdaHttpError } from 'common/utils/http';

export const encodeToBase64 = (obj: any) => Buffer.from(JSON.stringify(obj)).toString('base64url');

export const parseBase64ToDynamoDbKey = (base64EncodedString: string): AWS.DynamoDB.DocumentClient.Key => {
  try {
    return JSON.parse(Buffer.from(base64EncodedString, 'base64url').toString());
  } catch (err) {
    console.log('[GET TWEETS][PARSE VALUE][FAILURE]', err);
    throw new LambdaHttpError(400, 'Provided incorrect paginationKey');
  }
}