import AWS from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { handleError, LambdaHttpError, formatSuccessfulResponse } from 'common/utils/http';
import { isStreamRunning } from 'common/utils';
import { validateInput } from 'common/utils/validation';
import { updateStreamStatus, getStreamStatus } from 'common/services/dynamoDB/streams';

import { invokeProducerLambda } from './lib/utils';
import StartStreamSchema from './schemas/StartStream.schema';
import { StartStreamInput } from './interfaces/StartStreamInput.interface';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const lambdaClient = new AWS.Lambda();

export const handler: APIGatewayProxyHandler = async ({ body }) => {
  try {
    const validatedInput = validateInput(StartStreamSchema, JSON.parse(body));

    const streamItem = await getStreamStatus(dynamodb);
    console.log('streamItem: ', streamItem);
    
    if (isStreamRunning(streamItem)) {
      throw new LambdaHttpError(409, 'Stop running stream!');
    }

    console.log('Starting new Stream.');
    invokeProducerLambda(lambdaClient, validatedInput.keyword);
    await updateStreamStatus(dynamodb, 'ON');

    return formatSuccessfulResponse({ message: 'Stream was started succesfully' });
  } catch (err) {
    return handleError(err);
  }
}