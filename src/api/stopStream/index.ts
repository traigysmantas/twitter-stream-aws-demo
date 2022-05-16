import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import { getStreamStatus } from 'common/services/dynamoDB/streams';
import { handleError } from 'common/utils/http/error/handleError';
import { LambdaHttpError } from 'common/utils/http/error/LambdaHttpError';
import { formatSuccessfulResponse } from 'common/utils/http/response/handlers';
import { isStreamRunning } from 'common/utils/isStreamRunning';
import { sendCloseMessage } from './lib/sendCloseMessage';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS();

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const streamItem = await getStreamStatus(dynamodb);
    
    if (!isStreamRunning(streamItem)) {
      throw new LambdaHttpError(409, 'Stream is not running!');
    }

    // send Message to SQS to stop stream.
    await sendCloseMessage(sqs);

    return formatSuccessfulResponse({
      message: 'stream was stopped succesfuly',
    });``

  } catch (err) {
    return handleError(err);
  }
};
