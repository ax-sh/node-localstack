FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Create app directory
WORKDIR /usr/src/app

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