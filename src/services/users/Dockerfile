FROM node:10-alpine
WORKDIR /usr/src/app/srv
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run" ,"start:prod" ]
EXPOSE 50050