import { StreamingV2GetRulesResult, TwitterApi } from 'twitter-api-v2';

export const setupStreamRules = async (twitterClient: TwitterApi, keyword: string) => {
  const rules = await twitterClient.v2.streamRules();

  if (rules?.data) {
    await deleteStreamRules(twitterClient, rules);
  }

  await addStreamRules(twitterClient, keyword);

  const updatedRules = await twitterClient.v2.streamRules();
  console.log('NEW updateRules RULES :', JSON.stringify(updatedRules.data, null, 2));
}

const deleteStreamRules = async (twitterClient: TwitterApi, rules: StreamingV2GetRulesResult): Promise<void> => {
  const rulesIds = rules.data.map(rule => rule.id);
  await twitterClient.v2.updateStreamRules({
    delete: {
      ids: rulesIds,
    },
  }).catch(err => {
    console.error('[TwitterApi Error][updateStreamRules][delete]', err);
    throw err;
  })
}

const addStreamRules = async (twitterClient: TwitterApi, keyword: string): Promise<void> => {
  await twitterClient.v2.updateStreamRules({
    add: [
      { value: keyword }
    ]
  }).catch(err => {
    console.log('[TwitterApi Error][updateStreamRules][add]', err);
    throw err;
  });
}

