FROM node:20.8.1
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
