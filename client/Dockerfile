# Use Bun for building the app
FROM oven/bun:alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies using Bun
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the app using Bun
RUN bun run build

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