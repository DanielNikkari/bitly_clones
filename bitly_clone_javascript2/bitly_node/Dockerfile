FROM node:16

WORKDIR /app_node

COPY package*.json ./

RUN npm install pg express eta body-parser

COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]