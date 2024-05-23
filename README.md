# tsx-watch

To install dependencies:

```bash
pnpm install
```

To run:

```bash
# run it in docker
pnpm up
```

## localstack js

https://docs.localstack.cloud/user-guide/integrations/sdks/javascript/

- awslocal s3api create-bucket --bucket sample-bucket | jq
- awslocal s3api list-buckets
- awslocal s3api list-buckets | jq

https://docs.localstack.cloud/user-guide/integrations/aws-cdk/
https://docs.localstack.cloud/user-guide/aws/s3/