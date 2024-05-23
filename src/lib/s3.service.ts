import {
  CreateBucketCommand,
  ListBucketsCommand,
  ListObjectsCommand,
  NoSuchBucket,
  PutObjectCommand,
  S3Client,
  type _Object
} from '@aws-sdk/client-s3';

export async function getAWSCredentials(s3Client: S3Client) {
  const { accessKeyId, secretAccessKey } = await s3Client.config.credentials();
  return { accessKeyId, secretAccessKey };
}

export async function listBuckets(s3Client: S3Client) {
  const { Buckets, ...rest } = await s3Client.send(new ListBucketsCommand());

  return Buckets;
}

interface IBucket {
  create(): any;
  list(): Promise<_Object[] | undefined>;
}

export class Bucket implements IBucket {
  constructor(
    public client: S3Client,
    public bucketName: string
  ) {}
  async create() {
    const createBucketCommand = new CreateBucketCommand({
      Bucket: this.bucketName,
      ObjectOwnership: 'ObjectWriter'
    });
    const response = await this.client.send(createBucketCommand);
    return response;
  }
  async uploadFile() {
    const input = {
      Bucket: this.bucketName,
      Key: 'hello-s3.txt',
      Body: 'Hello S3!'
      //   Metadata: {
      //     metadata1: 'value1',
      //     metadata2: 'value2'
      //   }
    };

    const command = new PutObjectCommand(input);

    try {
      const response = await this.client.send(command);
      return response;
    } catch (err) {
      console.log(err, 666);
    }
  }

  async list() {
    const command = new ListObjectsCommand({ Bucket: this.bucketName });
    try {
      const { Contents } = await this.client.send(command);
      return Contents;
    } catch (err) {
      // throw err;
      if (err instanceof NoSuchBucket) {
        const e = err as NoSuchBucket;
        console.log(e.$metadata, 7777);
        return undefined;
      }
    }
  }
}

export class S3Controller {
  constructor(public client: S3Client) {}
  bucket(bucketName: string): Bucket {
    return new Bucket(this.client, bucketName);
  }
}
