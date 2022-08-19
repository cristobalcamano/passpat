FROM node:12.20-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm cache clean --force
RUN npm install --force
RUN npm i bootstrap --force
RUN npm install @popperjs/core --force

COPY . /app

RUN npm run build

#Segunda Etapa
FROM nginx:1.17.1-alpine

#COPY --from=build-step /app/dist/pat-pass-app /usr/share/nginx/html
COPY --from=build-step /app/dist/pat-pass-app /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
