FROM node:20

WORKDIR /app

COPY . /app

RUN npm i

EXPOSE 8080

CMD npm run start