import Joi from 'joi';

import { TweetsStatisticsParams } from '../interfaces/TweetsStatisticsParams';

const TweetsStatisticsSchema: Joi.ObjectSchema<TweetsStatisticsParams> = Joi.object({
  startTime: Joi.string().isoDate().required(),
  endTime: Joi.string().isoDate().required(),
  countryCode: Joi.string().length(2).required().insensitive().uppercase().allow('NONE'),
})

export default TweetsStatisticsSchema;