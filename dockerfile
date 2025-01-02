# Use the official Node.js image to build the app
FROM node:23 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's files
COPY . .

# Build the React app
RUN npm run build

# Use the official NGINX image to serve the app
FROM nginx:latest

# Copy build files to NGINX's default location
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port NGINX will listen on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]