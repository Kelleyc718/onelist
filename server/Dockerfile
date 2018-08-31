FROM node:alpine

WORKDIR '/server'

COPY package.json .
RUN npm install
COPY . .

#Webtoken Random String

ENV APP_SECRET=8C1QgJI9etIsg568R12K

#Server port
ENV PORT=6200

#Google Client Information

ENV GOOGLE_CLIENT_ID=43105732810-m5skdss3nplt2cs95ebuaih450cr1hso.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SEC=6fHVzLs2cXTYTswkgGC7cSW5

#Spotify Client Information

ENV SPOTIFY_CLIENT_ID=1aa56858630545d4bfa3ae0de924962a
ENV SPOTIFY_CLIENT_SEC=0d611dbe0f1141f7b86302379eda8c42

EXPOSE 6200

CMD ["npm", "start"]