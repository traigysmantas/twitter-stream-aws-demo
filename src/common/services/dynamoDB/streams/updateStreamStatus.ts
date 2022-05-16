export const updateStreamStatus = async (dynamodb: AWS.DynamoDB.DocumentClient, status: 'ON' | 'OFF') => {
  return dynamodb.put({
    TableName: process.env.STATUS_TABLE_NAME,
    Item: {
      streamId: 1,
      currentStatus: status,
    }
  }).promise()
}