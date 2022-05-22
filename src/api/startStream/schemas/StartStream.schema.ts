import Joi from 'joi';

import { StartStreamInput } from '../interfaces/StartStreamInput.interface';

const StartStreamSchema: Joi.ObjectSchema<StartStreamInput> = Joi.object({
  keyword: Joi.string().required(),
})

export default StartStreamSchema;