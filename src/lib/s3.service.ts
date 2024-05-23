import {
  CreateBucketCommand,
  ListBucketsCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';
import { expect } from 'vitest';

export async function getAWSCredentials(s3Client: S3Client) {
  const { accessKeyId, secretAccessKey } = await s3Client.config.credentials();
  return { accessKeyId, secretAccessKey };
}

export async function listBuckets(s3Client: S3Client) {
  const { Buckets, ...rest } = await s3Client.send(new ListBucketsCommand());

  return Buckets;
}

export class Bucket {
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
      Body: 'filetoupload',
      Bucket: this.bucketName,
      Key: 'exampleobject',
      Metadata: {
        metadata1: 'value1',
        metadata2: 'value2'
      }
    };
    const command = new PutObjectCommand(input);

    try {
      const response = await this.client.send(command);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

export class S3Controller {
  constructor(public client: S3Client) {}
  bucket(bucketName: string): Bucket {
    return new Bucket(this.client, bucketName);
  }
}
