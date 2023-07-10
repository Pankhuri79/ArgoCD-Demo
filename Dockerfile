# Use the official Node.js 14 image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the application files to the container
COPY package.json ./
COPY index.js ./

# Install dependencies
RUN npm install express

# Expose a port for the application
EXPOSE 8080

# Specify the command to start the application
CMD [ "node", "index.js" ]
