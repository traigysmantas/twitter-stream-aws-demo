import { TwitterApi } from 'twitter-api-v2';

export const initSearchStream = async (twitterClient: TwitterApi) => {
  const stream = await twitterClient.v2.searchStream({
    'tweet.fields': 'created_at',
    'place.fields': ['country', 'country_code', 'geo'],
    expansions: ['geo.place_id'],
    autoConnect: false,
  });

  return stream;
};
