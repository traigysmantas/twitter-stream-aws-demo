/**
 * Reusable error class used throughout cloud functions.
 */
 export class LambdaHttpError extends Error {

  public constructor(public statusCode: number, message?: string) {
    super(message);
  }
}