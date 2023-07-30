FROM node:18-alpine
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --ignore-scripts

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "start"]
