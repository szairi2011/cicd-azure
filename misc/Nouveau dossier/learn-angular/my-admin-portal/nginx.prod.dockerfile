##### Stage-1: build the Angular app for production
FROM node:10 as angular-builder

WORKDIR /app
COPY package.json package-lock.json ./

# NB: Disable proxy settings if proxy is not needed
RUN npm config set proxy http://10.49.98.4:8080
RUN npm config set https-proxy http://10.49.98.4:8080

# Install Angular npm dependencies on the image
RUN npm install

RUN npm install -g @angular/cli@10.2.3

# Copy the Angular project artifacts to be able to build;
# the unncessary content will not be included in the runtime later
COPY . .
# Create the build /dist artifacts inside the image
RUN ng version
RUN ng build --prod

##### Stage-2: deploy only the build to nginx http server; keeping a concise runtime container no node or npm or ng cli or sdk node modules ...
FROM nginx:alpine

#ENV NODE_ENV=production
# Volume can either be cretaed by docker-compose or when running docker run -v /usr/share/nginx/html ...
# e.g. command -- VOLUME /usr/share/nginx/html

# Keeping the runtime container size as small as possible
COPY --from=angular-builder /app/dist /usr/share/nginx/html
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf

# When the container starts, replace the env.js with values from environment variables thanks to the envsubst command
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/my-admin-portal/assets/env.template.js > /usr/share/nginx/html/my-admin-portal/assets/env.js && exec nginx -g 'daemon off;'"]
