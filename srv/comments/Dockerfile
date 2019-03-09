FROM node:10-alpine
WORKDIR /usr/src/app/srv
COPY package*.json ./
RUN npm install --production
COPY . .
CMD [ "npm", "run" ,"start:prod" ]
EXPOSE 50050