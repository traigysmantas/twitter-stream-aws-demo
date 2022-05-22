import { JsonObject } from 'common/interfaces/JsonObject.interface';
import Joi from 'joi';

import { LambdaHttpError } from './http';

export const validateInput = <T>(schema: Joi.ObjectSchema<T>, input: JsonObject) => {
  const { error, value } = schema.validate(input);

  if (error) {
    console.error(`[Failure][Validation] Error: `, error);
    throw new LambdaHttpError(400, error.message);
  }

  return value;
};