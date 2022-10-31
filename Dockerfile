FROM node:latest
WORKDIR /app
COPY package*.json /app
RUN npm install
RUN npm install --save express
COPY . /app
CMD node server.js
EXPOSE 8080