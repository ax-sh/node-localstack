import { S3Client } from '@aws-sdk/client-s3';
import { expect } from 'vitest';

import { LOCALSTACK_CONFIG } from '../testing/configs.ts';
import { Bucket, S3Controller, getAWSCredentials, listBuckets } from './s3.service.ts';

describe('localstack s3 test', () => {
  const s3Client = new S3Client(LOCALSTACK_CONFIG);
  it('should ', async () => {
    expect(1).toBe(1);
  });

  it('should be localstack test credentials', async () => {
    const credentials = await getAWSCredentials(s3Client);
    expect(credentials.accessKeyId).toBe('test');
    expect(credentials.secretAccessKey).toBe('test');
  });

  it('should list s3 items', async () => {
    const buckets = await listBuckets(s3Client);
    expect(buckets).toHaveLength(0);
  });

  it('should create s3 bucket', async () => {
    const client = new S3Controller(s3Client);
    const bucket = client.bucket('test-bucket');
    const r = await bucket.create();
    console.log(r);
  });

  it.only('should upload file', async () => {
    const client = new S3Controller(s3Client);
    const bucket = client.bucket('sample-bucket');
    const buckets = await bucket.uploadFile();
    console.log(buckets);
    // expect(buckets).toHaveLength(0);
  });
});
