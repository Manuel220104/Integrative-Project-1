# Use an official Node.js 18.x runtime as the base image
FROM node:18.16.1

 

# Set the working directory in the container
WORKDIR /app

 

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

 

# Install project dependencies
RUN npm install

 

# Copy the entire project directory into the container
COPY . .

 

# Build your React Vite project
RUN npm run build

 

# Expose the port that your application will run on (change it to match your application's port)
EXPOSE 3000

 

# Define the command to run your application
CMD ["npm", "run","dev","--host"]
