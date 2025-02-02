import { LambdaClient } from '@aws-sdk/client-lambda';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

// Configure the AWS SDK to use the LocalStack endpoint and credentials
const lambda = new LambdaClient({
  endpoint: 'http://localhost:4566',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test'
  }
});

// Call a Lambda API using the LocalStack endpoint
// lambda.send(new ListFunctionsCommand({}))
//     .then((data) => console.log(data))
//     .catch((error) => console.error(error));

// By default, @aws-sdk/client-s3 will using virtual host addressing:
// -> http://<bucket-name>.s3.localhost.localstack.cloud:4566/<key-name>
// To allow those requests to be directed to LocalStack, you need to set a specific endpoint.
// If this is not possible, you can set the special S3 configuration flag to use path
// addressing instead:
// -> http://s3.localhost.localstack.cloud:4566/<bucket-name>/<key-name>
// You can read the S3 documentation to learn more about the different endpoints.
const LOCALSTACK_HOST = process.env.LOCALSTACK_HOST;
export const s3 = new S3Client({
  region: 'us-east-1',
  forcePathStyle: true // If you want to use virtual host addressing of buckets, you can remove `forcePathStyle: true`.
  // endpoint: `${LOCALSTACK_HOST}:4566`,
  // endpoint: 'http://s3.localhost.localstack.cloud:4566',
  // credentials: {
  //   accessKeyId: 'test',
  //   secretAccessKey: 'test'
  // }
});

export const uploadTest = async () => {
  const command = new PutObjectCommand({
    Bucket: 'test-bucket',
    Key: 'hello-s3.txt',
    Body: 'Hello S3!'
  });

  try {
    const response = await s3.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};
