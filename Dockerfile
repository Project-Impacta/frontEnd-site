FROM node:20.11.1
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
ENV API_URL=http://backend:3333
ENV JWT_PASS='WLN6dqLUzSb1aiUw2d11afcnyt4321z'
ENV FRONTEND_ORIGIN='frontend-origin'
ENV FRONTEND_TOKEN='ad120r9j09ASJ0912ssSA9Sj1'

