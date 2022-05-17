import AWS from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { handleError, LambdaHttpError, formatSuccessfulResponse } from 'common/utils/http';
import { isStreamRunning } from 'common/utils';
import { updateStreamStatus, getStreamStatus } from 'common/services/dynamoDB/streams';

import { invokeProducerLambda } from './lib/utils';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const lambdaClient = new AWS.Lambda();

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { keyword } = JSON.parse(event.body);
    if (!keyword) throw new LambdaHttpError(400, 'Keyword must be provided!');
  
    const streamItem = await getStreamStatus(dynamodb);
    console.log('streamItem: ', streamItem);
    
    if (isStreamRunning(streamItem)) {
      throw new LambdaHttpError(409, 'Stop running stream!');
    }

    console.log('Starting new Stream.');
    invokeProducerLambda(lambdaClient, keyword);
    await updateStreamStatus(dynamodb, 'ON');

    return formatSuccessfulResponse({ message: 'Stream was started succesfully' });
  } catch (err) {
    return handleError(err);
  }
}