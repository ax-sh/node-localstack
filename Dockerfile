#FROM nikolaik/python-nodejs:latest AS base
FROM node:20-alpine AS base


ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Create app directory
WORKDIR /usr/src/app


# https://stackoverflow.com/questions/59812009/what-is-the-use-of-pythonunbuffered-in-docker-file
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3-dev=~3.12 py3-pip jq curl && ln -sf python3 /usr/bin/python


# =================== #
#  Install localstack #
# =================== #
RUN apk add --update --no-cache gcc musl-dev linux-headers
RUN pip install --no-cache-dir --break-system-packages --upgrade localstack awscli-local

# =================== #
#  Install AWSCli v2  #
# =================== #
COPY --from=devopscorner/aws-cli:latest /usr/local/aws-cli/ /usr/local/aws-cli/
COPY --from=devopscorner/aws-cli:latest /usr/local/bin/ /usr/local/bin/

# verify aws cli installation
RUN aws --version

RUN npm add -g tsx

# Install app dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm i

# For vitest
RUN mkdir node_modules/.vite && chmod -R 777 node_modules/.vite

# Copy in the source
COPY . .

# RUN echo -e '#!/bin/bash \\n alias cls='clear' > /usr/bin/cls && chmod +x /usr/bin/cls
# Don't use root user
USER node



# alias awslocal="AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test AWS_DEFAULT_REGION=${DEFAULT_REGION:-$AWS_DEFAULT_REGION} aws --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566"

# Expose Port
EXPOSE 3000

CMD ["pnpm", "test"]