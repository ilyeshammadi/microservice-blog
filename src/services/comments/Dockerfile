FROM node:10-alpine
WORKDIR /src
ARG SERVICE
ENV NODE_ENV=production
COPY services/$SERVICE/package.json ./services/$SERVICE/package.json
COPY services/$SERVICE/package-lock.json ./services/$SERVICE/package-lock.json
RUN npm install --prefix services/$SERVICE
COPY common ./services/$SERVICE/common
COPY services/$SERVICE/ ./services/$SERVICE/
WORKDIR /src/services/$SERVICE
EXPOSE 50050
CMD [ "npm", "run" ,"start:prod" ]