FROM node:16
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build
# RUN npm run dev
# will run on 3000 now
# TODO Ziad define the port explicity in the previous comments
# TODO Ziad add how to run production server instead of these comments
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
# CMD [ "node", "server.js" ]