# Use an official Node.js runtime as a parent image
FROM node:14.20

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Expose port 4200 for the web server
EXPOSE 4200

# Run the web server
CMD ["npm", "run", "serve"]
