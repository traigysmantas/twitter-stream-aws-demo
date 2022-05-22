import { Context } from 'aws-lambda';

/**
 * Checks if remaining execution Lambda is less than provided time value.
 */
 export const isTriggerExitRequired = (context: Context, timeInMs: number): boolean => {
  const remainingTime = context.getRemainingTimeInMillis();

  return (remainingTime - timeInMs) < 0
}