import Joi from 'joi';

import { GetTweetsQueryParams } from '../interfaces/GetTweetsQueryParams.interface';

const GetTweetsSchema: Joi.ObjectSchema<GetTweetsQueryParams> = Joi.object({
  keyword: Joi.string().optional(),
  limit: Joi.number().required().valid(5, 10, 20, 50),
  paginationKey: Joi.string().base64().optional(),
})

export default GetTweetsSchema;