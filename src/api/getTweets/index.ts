import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import { handleError, formatSuccessfulResponse, LambdaHttpError } from 'common/utils/http';
import { validateInput } from 'common/utils/validation';

import { getTweetsFromTable } from './lib/dynamoDB';
import { encodeToBase64 } from './lib/utils';
import GetTweetsSchema from './schemas/GetTweets.schema';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TWEETS_TABLE = process.env.TWEETS_TABLE_NAME;
const TWEETS_TABLE_INDEX = process.env.TWEETS_TABLE_INDEX;

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const queryParams = validateInput(GetTweetsSchema, event.queryStringParameters);

    console.log('[GetTweets] transformed QueryParams: ', queryParams);

    const tweetsResponse = await getTweetsFromTable(dynamodb, TWEETS_TABLE, TWEETS_TABLE_INDEX, queryParams);

    return formatSuccessfulResponse({
      tweets: tweetsResponse.Items,
      ...(tweetsResponse.LastEvaluatedKey && {
        paginationKey: encodeToBase64(tweetsResponse.LastEvaluatedKey)
      }),
    });
  } catch (err) {
    return handleError(err);
  }
};
