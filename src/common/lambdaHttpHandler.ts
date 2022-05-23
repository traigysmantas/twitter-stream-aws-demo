import { APIGatewayProxyEvent } from 'aws-lambda';
import Joi from 'joi';

import { formatSuccessfulResponse, handleError } from './utils/http';
import { validateInput } from './utils/validation';

const lambdaHttpHandler = async <T>({ queryStringParameters, body }: APIGatewayProxyEvent, fn: (params: T, services?: any) => any, services?: any, validationSchema?: Joi.ObjectSchema<T>) => {
  try {
    const inputParams = {
      ...(queryStringParameters && { ...queryStringParameters }),
      ...(body && { ...JSON.parse(body) })
    }
    console.log('inputParams: ', inputParams);

    // TO DO: refactor to be more generic or introduce interface/function per LambdaFn to get inputParams.
    const validatedParams = validationSchema ? validateInput(validationSchema, inputParams): inputParams;

    const result = await fn(validatedParams, services);

    return formatSuccessfulResponse(result);
  } catch (err) {
    return handleError(err);
  }
};

export default lambdaHttpHandler;