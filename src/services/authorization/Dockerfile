FROM node:10-alpine AS builder
WORKDIR /src
ARG SERVICE
COPY services/$SERVICE/package.json ./services/$SERVICE/package.json
COPY services/$SERVICE/package-lock.json ./services/$SERVICE/package-lock.json
RUN npm install --prefix services/$SERVICE
COPY common ./services/$SERVICE/common
COPY services/$SERVICE/ ./services/$SERVICE/
WORKDIR /src/services/$SERVICE
RUN npm run build

FROM node:10-alpine
ARG SERVICE
ENV NODE_ENV=production
COPY --from=builder /src /src
WORKDIR /src/services/$SERVICE
RUN npm install
CMD [ "npm", "run" ,"start:prod" ]
EXPOSE 50050