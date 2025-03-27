# Multi-stage build for Big-Paws Pet Boarding Application
# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine AS runner

WORKDIR /app

# Set to production environment
ENV NODE_ENV=production

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only the necessary files from the builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Set the correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]

# CONFIGURATION GUIDE:
# 1. Build the Docker image: docker build -t big-paws-app .
# 2. Run the container: docker run -p 3000:3000 big-paws-app
# 3. For development, you may want to mount volumes for hot reloading
# 4. Environment variables can be passed at runtime with -e flag:
#    docker run -p 3000:3000 -e DATABASE_URL=your_db_url big-paws-app

