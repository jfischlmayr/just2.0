FROM node:lts-alpine AS build
ARG NG_CONFIG=production

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN mkdir -p ./dist/just && npm run build -- --configuration=${NG_CONFIG}

FROM nginx:alpine
WORKDIR /app
COPY --from=build /app/dist/just /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
