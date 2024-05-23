export const LOCALSTACK_CONFIG = {
  endpoint: 'http://localstack:4566',
  region: 'us-east-1',
  credentials: { accessKeyId: 'test', secretAccessKey: 'test' }
};
export const LOCALSTACK_CONFIG_S3 = { ...LOCALSTACK_CONFIG, forcePathStyle: true };
