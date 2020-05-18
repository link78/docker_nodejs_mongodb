FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./


COPY . .

EXPOSE 4200

CMD ["npm","start"]

