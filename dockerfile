# 1. Use the official Node.js image to build the app
FROM node:23 AS build

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the app's files
COPY . .

# 6. Build the React app
RUN npm run build

# 7. Use the official NGINX image to serve the app
FROM nginx:latest

# 8. Copy build files to NGINX's default location
COPY --from=build /app/dist /usr/share/nginx/html

# 9. Expose the port NGINX will listen on
EXPOSE 80

# 10. Start NGINX
CMD ["nginx", "-g", "daemon off;"]