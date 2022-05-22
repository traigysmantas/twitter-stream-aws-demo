import Joi from 'joi';

import { StatisticsQueryParams } from '../interfaces/StatisticsQueryParams';

const GetTweetsStatistics: Joi.ObjectSchema<StatisticsQueryParams> = Joi.object({
  startTime: Joi.string().isoDate().required(),
  endTime: Joi.string().isoDate().required(),
  countryCode: Joi.string().length(2).required().insensitive().uppercase().allow('NONE'),
})

export default GetTweetsStatistics;