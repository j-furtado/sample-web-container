FROM azcontregxpto.azurecr.io/node:8.9.3-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Open the port for the app
EXPOSE 8080

# Run NodeJS server
CMD [ "npm", "start" ]
