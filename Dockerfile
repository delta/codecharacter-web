FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent
COPY src/config/config.example.ts src/config/config.ts

COPY . .

RUN npm run build

WORKDIR /usr/src/app/server

EXPOSE 5000

RUN npm install --silent
ENTRYPOINT [ "npm", "start" ]
