# Node.js base image
FROM node:latest

VOLUME [ "/app" ]

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port the app runs in
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
