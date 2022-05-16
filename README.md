# TwitterDemoTs

The purpose of this project was to create a AWS Cloud based serverless solution to browse and query Twitter tweets.

Twitter tweets are retrieved using [Real-time Filtered Stream API](https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/api-reference). All tweets are pushed to SQS Queue and and consumed by Lambda using Event Source Mapping.
Lambda Consumer store incoming tweets into DynamoDB and CloudWatch (create custom metrics by keyword and country).

Solution exposes 3 endpoints:
- POST /stream - to start stream with defined keyword.
- DELETE /stream - stop running stream.
- GET /tweets - retrieve already collected tweets.


## Resources

AWS Services used:
- API Gateway
  - 3 endpoints defined above.
- SQS queues:
  - StreamCloseQueue - inform running ProducerFunction Lambda to stop running Stream.
  - TweetsFifoQueue - FIFO queue to push tweets from Twitter Stream API. 
- DynamoDB tables:
  - StreamStatusTable - Stream status data.
  - TweetsTable - table used to store tweets. Indexed by tweetId + createDate and keyword + createDate.
- Lambda
  - ProducerFunction - Query twitter API for tweets & push them to TweetsFifoQueue . Also long poll StreamCloseQueue for close event, when event is present -> close stream and end process.
  - ConsumerFunction - EventSourceMapping used with to TweetsFifoQueue. Process SQS message (tweets) & insert it/them to Dynamodb & CloudWatch.  
  - StartStreamFunction - check if Stream is not running in DynamoDB and invokeProducerFunction
  - StopStreamFunction - check if Stream is running in DynamoDB and push SQS message to StreamCloseQueue to close stream.
  - GetTweetsFunction - retrieve tweets by keyword from DynamoDB table.
- CloudWatch
  - Two custom metrics are added to query tweets info by country/keyword. 
 ## Limitations

 Project has several limitations:
- Free Twitter account allows to query only single stream at the time.
- Free Twitter account does not allow to only query tweets which have country metadata, therefore most (99%) of tweets don't have country information. (Only Enterprise account has this [capability](https://twittercommunity.com/t/how-to-listen-to-tweets-that-only-contains-geo-info-from-twitter-stream/162905/3) )
- API endpoints are not secured. Need to add auth using Lambada authorizers.
- Consumer saves DynamoDB values in batches & Metrics by single value. This can generate data inconsistencies between systems if one of the calls fails. DLQ solution should be implemented to ensure data is stored correctly in both systems.
- To stay in free tier and due to the lack of time, stream is queried using Lambda Function with predefined timeout of 210 seconds (3.5 minutes). Lambda is continously Long polling (timeout 20s) SQS Queue to get StreamClose event. If Timeout is not received, Lambda safely close the stream and exit process, when 25s is left until it's timeout. There possible alternatives to investigate:

| Alternative                                                       | Possible Issues |
| -----------                                                       | ----------- |
| Deploy Server using AWS Elastic Beanstalk or other AWS service    | Not serverless, thus not cool|
| Invoke ProducerFunction recursively                               | Risky, if something fails on SQS side. Stream data is lost between invocations|
| Use Step Functions AWS service to create new stream               | Stream data is lost between invocations|
| **Create Fargate Task to run long stream proccess**               | **At first sight, hard to setup. AWS does not have free tier**|
## Possible Improvements

- Add Swagger docs.
- Investigate & add API Gateway Lambda authorizers.
- Refactor SQS & DynamoDB integration parts to use Generics.
- Investigate how to retrieve Tweets Statistics via API.
- Investigate Fargate Service and use it instead of Producer Lambda.
- Investigate DLQ solution to ensure data is stored correctly between DynamoDB & CloudWatch.

## Deploy application

Install AWS & SAM CLI.

Setup AWS locally to point to your account.

Create free Twitter account & setup bearer token for authorization.

Add bearer token to AWS Parameter Store and link name to TwitterBearerToken parameter in [SAM Template](./template.yaml)

Install npm dependencies:
```
npm run install
```

Build, bundle & build and deploy SAM template CloudFormation:
```
npm run deploy
```

## Cleanup

To delete the tweets project with it's underlying stack from AWS, run this command: 

```
aws cloudformation delete-stack --stack-name TwitterDemoTs
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
