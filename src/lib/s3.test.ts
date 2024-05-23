import {S3Client, ListBucketsCommand} from "@aws-sdk/client-s3";


describe('localstack s3 test', () => {
    const s3Client = new S3Client({});
  it('should ', async () => {
      expect(1).toBe(1)
  });

  it('should be localstack test credentials', async () => {
      const creds = await s3Client.config.credentials()
      expect(creds.accessKeyId).toBe('test')
      expect(creds.secretAccessKey).toBe('test')
  });

    it('should list s3 items', async () => {
        const list = await s3Client.send(new ListBucketsCommand({}))
        console.log(list, 888)

    });
});
