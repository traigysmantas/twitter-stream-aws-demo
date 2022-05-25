import Tweet from 'common/interfaces/Tweet.inferface';
import { ApiV2Includes, TweetV2SingleStreamResult } from 'twitter-api-v2'

export const transformTweet = (keyword: string, { data, includes }: TweetV2SingleStreamResult): Tweet => {
  const { id, text, created_at } = data;

  return {
    keyword,
    createdAt: created_at,
    tweetId: id,
    text,
    ...getTweetCountryDetails(includes),
  }
}

const getTweetCountryDetails = (includes: ApiV2Includes) => {
  const place = includes?.places?.[0];

  return {
    country: place ? place.country : 'N/A',
    countryCode: place ? place.country_code : 'N/A',
  }
}