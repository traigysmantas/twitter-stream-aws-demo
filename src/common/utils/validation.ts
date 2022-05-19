import Joi from 'joi';
import { LambdaHttpError } from './http';

interface JsonObject {
  [key: string]: any;
}

export const validateInput = (schema: Joi.ObjectSchema, input: JsonObject) => {
  const { error } = schema.validate(input);

  if (error) {
    console.error(`[Failure][Validation] Error: `, error);
    throw new LambdaHttpError(400, error.message);
  }
};