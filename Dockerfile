FROM node:18-alpine3.16

WORKDIR /app

COPY package.json ./package.json

RUN npm i 

COPY . ./

RUN npm build 

EXPOSE 3000 

CMD ["node", "./dist/index.js"]

