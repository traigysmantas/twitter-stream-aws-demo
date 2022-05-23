import { GetTweetsParams } from '../interfaces/GetTweetsParams.interface';
import { getTweetsFromTable } from './dynamoDB/getTweetsFromTable';
import { encodeToBase64 } from './utils';

const TWEETS_TABLE = process.env.TWEETS_TABLE_NAME;
const TWEETS_TABLE_INDEX = process.env.TWEETS_TABLE_INDEX;

export const getTweets = async (params: GetTweetsParams, { dynamodb }) => {
  console.log('[GetTweets] incoming Params: ', params);

  const { Items, LastEvaluatedKey } = await getTweetsFromTable(
    dynamodb,
    TWEETS_TABLE,
    TWEETS_TABLE_INDEX,
    params
  );

  return {
    tweets: Items,
    ...(LastEvaluatedKey && {
      paginationKey: encodeToBase64(LastEvaluatedKey),
    }),
  };
};
