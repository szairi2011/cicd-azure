FROM node

# Set environment variables for the HTTP proxy
ARG HTTP_PROXY=http://10.49.98.4:8080
ARG HTTPS_PROXY=$HTTP_PROXY
ARG NO_PROXY=localhost,127.0.0.1,localhost.localdomain,10.49.98.4

# Set the environment variables for the package manager
ENV http_proxy=$HTTP_PROXY
ENV https_proxy=$HTTPS_PROXY
ENV no_proxy=$NO_PROXY

ENV HTTP_PROXY=$HTTP_PROXY
ENV HTTPS_PROXY=$HTTPS_PROXY
ENV NO_PROXY=$NO_PROXY

WORKDIR /usr/api
COPY package.json ./
COPY package-lock.json ./
COPY ./src/db/ ./src/db/
COPY . .
RUN npm install --quiet