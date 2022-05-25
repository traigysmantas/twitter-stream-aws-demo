import { getStreamStatus } from 'common/services/dynamoDB/streams';
import { dynamodb, sqs } from 'common/services/instances';
import { isStreamRunning } from 'common/utils';
import { LambdaHttpError } from 'common/utils/http';

import { sendCloseMessage } from './sendCloseMessage';

export const stopStream = async () => {
    const streamItem = await getStreamStatus(dynamodb);

    if (!isStreamRunning(streamItem)) {
      throw new LambdaHttpError(409, 'Stream is not running!');
    }

    // send Message to SQS to stop stream.
    await sendCloseMessage(sqs);

    return { message: 'stream was stopped succesfully' };
};
