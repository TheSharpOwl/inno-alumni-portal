FROM node:16
# Create app directory
WORKDIR /usr/src/app

RUN npm install --global pm2

# Install app dependencies
COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
