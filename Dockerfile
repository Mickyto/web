  FROM node:latest

  MAINTAINER Igor Egay https://github.com/mickyto
  RUN mkdir -p /usr/src/app
  WORKDIR /usr/src/app

  EXPOSE 3000
