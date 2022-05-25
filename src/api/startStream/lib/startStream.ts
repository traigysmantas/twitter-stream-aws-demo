import { LambdaHttpError } from 'common/utils/http';
import { isStreamRunning } from 'common/utils';
import { getStreamStatus, updateStreamStatus } from 'common/services/dynamoDB/streams';

import StartStreamInput from '../interfaces/StartStreamInput.interface';

import { invokeProducerLambda } from './invokeProducerLambda';

export const startStream = async (params: StartStreamInput, { dynamodb, lambdaClient }) => {
  console.log('startStream params: ', params);

  const streamItem = await getStreamStatus(dynamodb);
  console.log('streamItem: ', streamItem);

  if (isStreamRunning(streamItem)) {
    throw new LambdaHttpError(409, 'Stop running stream!');
  }

  console.log('Starting new Stream.');
  invokeProducerLambda(lambdaClient, params.keyword);
  await updateStreamStatus(dynamodb, 'ON');

  return { message: 'Stream was started succesfully' };
}