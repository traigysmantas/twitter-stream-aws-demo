import { Dimension } from 'aws-sdk/clients/cloudwatch';

export const getDimensions = async (
  countryCode: string
): Promise<Dimension[]> => {
  return [
    {
      Name: 'countryCode',
      Value: countryCode === 'NONE' ? 'N/A' : countryCode,
    },
  ];
};
