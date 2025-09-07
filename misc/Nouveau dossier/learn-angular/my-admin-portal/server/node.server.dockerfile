FROM node:alpine
COPY ./database.json /opt/database.json

# Comment below npm proxy settings if proxy is not needed -- proxy setup was required to build from emea-tun-ptds01 
RUN npm config set proxy http://10.49.98.4:8080
RUN npm config set https-proxy http://10.49.98.4:8080

RUN npm install -g json-server
EXPOSE 3000
#CMD ["json-server", "--watch", "-H", "0.0.0.0", "/opt/database.json"]
# ENTRYPOINT ["json-server", "--watch", "-H", "0.0.0.0", "/opt/database.json"]
ENTRYPOINT ["json-server", "--watch", "-H", "0.0.0.0", "--port", "80", "/opt/database.json"]

# docker build -t soulou2019/node-server -f node.server.dockerfile
# docker run -d -p 3000:3000 --name soulou2000/node-server node-server
