import { APIGatewayProxyEvent } from 'aws-lambda';
import Joi from 'joi';
import { formatSuccessfulResponse, handleError } from './utils/http';

import { validateInput } from './utils/validation';

const lambdaHttpHandler = async <T>({ queryStringParameters, body }: APIGatewayProxyEvent, validationSchema: Joi.ObjectSchema<T>, services: any, fn: (params: T, services: any) => any) => {
  try {
    const inputParams = {
      ...(queryStringParameters && { queryStringParameters }),
      ...(body && { body })
    }
    console.log('inputParams: ', inputParams);

    // TO DO: refactor to be more generic or introduce interface/function per LambdaFn to get inputParams.
    const validatedParams = validateInput(validationSchema, inputParams);

    const result = await fn(validatedParams, services);

    return formatSuccessfulResponse(result);
  } catch (err) {
    return handleError(err);
  }
};

export default lambdaHttpHandler;