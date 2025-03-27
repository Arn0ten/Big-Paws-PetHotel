# Build stage
FROM node:16-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM node:16-alpine AS runner

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Switch to non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]

# CONFIGURATION GUIDE:
# 1. This Dockerfile uses a multi-stage build to create a smaller production image
# 2. The builder stage installs dependencies and builds the Next.js application
# 3. The runner stage only contains what's needed to run the application
# 4. A non-root user is created for better security
# 5. To build: docker build -t big-paws-app .
# 6. To run: docker run -p 3000:3000 big-paws-app
