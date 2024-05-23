#FROM nikolaik/python-nodejs:latest AS base
FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Create app directory
WORKDIR /usr/src/app


# https://stackoverflow.com/questions/59812009/what-is-the-use-of-pythonunbuffered-in-docker-file
ENV PYTHONUNBUFFERED=1
RUN apk add --no-cache aws-cli
RUN apk add --update --no-cache python3=~3.12 py3-pip && ln -sf python3 /usr/bin/python
# pip install --upgrade awscli --break-system-packages


#CMD ["/bin/bash"]

RUN npm add -g tsx

# Install app dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm i

# Copy in the source
COPY . .

# Don't use root user
USER node

# Expose Port
EXPOSE 3000