
FROM node:12.16.2

ADD package.json package-lock.json /app/

WORKDIR /app

RUN npm install

COPY ./ /app



CMD ["npm","start"]