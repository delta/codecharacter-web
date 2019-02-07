FROM node:8.11.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent
COPY src/config/config.example.ts src/config/config.ts

COPY . .

RUN npm run build
RUN npm install -g serve

CMD ["serve", "build"]
