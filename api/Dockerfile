# Node.js base image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install && npm install typescript -g

# Bundle app source
COPY . .

# Build the app
RUN tsc

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD [ "node", "./dist/index.js" ]
