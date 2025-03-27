# Dockerfile for Big-Paws Pet Boarding Application
# Multi-stage build for optimized production image

# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create production image
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
# Add other environment variables as needed
# ENV DATABASE_URL=your_production_database_url
# ENV NEXT_PUBLIC_API_URL=your_api_url

# Copy built application from builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

# CONFIGURATION GUIDE:
# 1. Adjust Node.js version if needed (currently using Node 18 Alpine)
# 2. Add your specific environment variables in the ENV section
# 3. If you have additional build steps, add them in the builder stage
# 4. For development, consider creating a separate Dockerfile.dev
# 5. Build the image: docker build -t big-paws-app .
# 6. Run the container: docker run -p 3000:3000 big-paws-app

