
FROM node:alpine-13.12.0

ADD package.json package-lock.json /app/

WORKDIR /app

RUN npm install

COPY ./ /app



CMD ["npm","start"]