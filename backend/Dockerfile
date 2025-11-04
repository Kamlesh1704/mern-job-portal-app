FROM node:22.20.0

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 5050

COPY . .

CMD ["npm", "start"]