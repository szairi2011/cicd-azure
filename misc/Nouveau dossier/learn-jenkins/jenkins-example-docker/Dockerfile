FROM node:16-alpine

# Set environment variables for the HTTP proxy
ARG HTTP_PROXY=http://10.49.98.4:8080
ARG HTTPS_PROXY=$HTTP_PROXY
ARG NO_PROXY=localhost,127.0.0.1,localhost.localdomain,10.49.98.4

# Set the environment variables for the package manager
ENV http_proxy=$HTTP_PROXY
ENV https_proxy=$HTTPS_PROXY
ENV no_proxy=$NO_PROXY

RUN apk add -U git curl
