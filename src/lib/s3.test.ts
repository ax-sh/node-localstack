import {S3Client} from "@aws-sdk/client-s3";

describe('localstack s3 test', () => {
  it('should list s3 items', async () => {
      expect(1).toBe(1)
  });

  it('should list s3 items', async () => {
      const s3Client = new S3Client({

      });
      console.log(s3Client,"s3Client")
  });
});
