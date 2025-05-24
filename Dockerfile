# base image source
FROM node:20-alpine

# create a work dir

WORKDIR /usr/index

# copy all the dependendency in the directory starting with package into the current directory

COPY package*.json ./

# install all dependency found in the package copied to the directory
RUN npm install

# copy from the source in your local directory into the workdir
COPY . .

# indicate a port for connection
EXPOSE 5000

# create a command to start the application
CMD ["npm", "start"]