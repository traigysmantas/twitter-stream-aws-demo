import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import { handleError, formatSuccessfulResponse, LambdaHttpError } from 'common/utils/http';

import { getTweetsFromTable } from './lib/dynamoDB';
import { getQueryParams } from './lib/getQueryParams';
import { encodeToBase64 } from './lib/utils';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TWEETS_TABLE = process.env.TWEETS_TABLE_NAME;
const TWEETS_TABLE_INDEX = process.env.TWEETS_TABLE_INDEX;

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const queryParams = getQueryParams(event);

    console.log('[GetTweets] transformed QueryParams: ', queryParams);

    if (!queryParams.keyword && !queryParams.limit) {
      throw new LambdaHttpError(400, 'Either keyword or limit query string must be provided to limit search results');
    }

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
