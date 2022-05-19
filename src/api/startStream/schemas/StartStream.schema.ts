import Joi from 'joi';

const StartStreamSchema = Joi.object({
  keyword: Joi.string().required(),
})

export default StartStreamSchema;