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
https://localstack-docs-preview-pr-444.surge.sh/references/network-troubleshooting/endpoint-url/#from-a-container-localstack-created

https://docs.localstack.cloud/user-guide/integrations/sdks/javascript/

- awslocal s3api list-buckets | jq
- awslocal s3api create-bucket --bucket sample-bucket | jq

    https://docs.localstack.cloud/user-guide/integrations/aws-cdk/
    https://docs.localstack.cloud/user-guide/aws/s3/
    https://gist.github.com/johnpolacek/fbb0f7ccc32c861d6544b0030ec71c66