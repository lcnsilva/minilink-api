FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update -y && apt-get install -y openssl

RUN npx prisma generate

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "start" ]

