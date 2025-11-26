# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install build dependencies for native modules
#RUN apk add --no-cache build-base python3

# Install all dependencies (including dev dependencies for building)
RUN npm cache clean --force && npm install  

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install only production dependencies
RUN npm install --production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on (adjust if different)
EXPOSE 8000

# Start the application
CMD ["node", "dist/index.js"]