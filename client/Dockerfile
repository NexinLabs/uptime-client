# Use Node.js for building the app
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Set environment variables to fix esbuild issues
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV ESBUILD_BINARY_PATH=/usr/local/bin/esbuild

# Copy package files
COPY package*.json ./

# Clean npm cache and remove any existing node_modules to avoid optional dependency issues
RUN npm cache clean --force && rm -rf node_modules package-lock.json

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Use nginx to serve the built app
FROM nginx:alpine

# Copy a custom nginx config to listen on port 3000
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


# To build and run the Docker container:
# docker build -t uptimeclient-client .
# docker run -d -p 3000:3000 uptimeclient-client