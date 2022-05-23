import Joi from 'joi';

import { GetTweetsParams } from '../interfaces/GetTweetsParams.interface';

const GetTweetsSchema: Joi.ObjectSchema<GetTweetsParams> = Joi.object({
  keyword: Joi.string().optional(),
  limit: Joi.number().required().valid(5, 10, 20, 50),
  paginationKey: Joi.string().base64({ urlSafe: true, paddingRequired: false }).optional(),
})

export default GetTweetsSchema;