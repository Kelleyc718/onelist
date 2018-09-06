FROM node:alpine

WORKDIR '/client'

COPY package.json .
RUN npm install
COPY . .

EXPOSE 6200

CMD ["npm", "start"]