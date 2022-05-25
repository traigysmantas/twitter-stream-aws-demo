import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import lambdaHttpHandler from 'common/lambdaHttpHandler';
import { getAvailableCountries } from './lib/getAvailableCountries';


const cloudwatch = new AWS.CloudWatch();

export const handler: APIGatewayProxyHandler = async (event) => {
  return lambdaHttpHandler(event, getAvailableCountries, { cloudwatch });
};
