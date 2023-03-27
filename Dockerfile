# Stage 1: Build dependencies
FROM node:16.13.1-alpine as base
WORKDIR /app
# COPY package.json yarn.lock ./

RUN yarn install --production

COPY . /app
# RUN yarn run build
# COPY package.json yarn.lock ./

COPY package.json /app
# COPY yarn.lock /app

RUN mkdir /app/certs
COPY certs/weedpedia-prod-postgres2.crt /app/certs/weedpedia-prod-postgres2.crt
# COPY certs /app/certs

RUN apk add --no-cache --virtual build-base \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    python3 \
    make \
    g++ && yarn install && apk del build-base \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    python3 \
    make \
    g++

# Stage 2: Build app
FROM base as builder
COPY . .
RUN yarn build 

# Stage 3: Serve app
LABEL author="fcavalcantirj"
EXPOSE 3000
CMD yarn start
