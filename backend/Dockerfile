# Use Node 20 slim image
FROM node:20-slim

# Install pnpm and openssl (required for Prisma)
RUN apt-get update -y && apt-get install -y openssl && npm install -g pnpm

WORKDIR /app

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy backend package files
COPY backend/package.json ./backend/

# Install dependencies (only for backend)
RUN pnpm install --filter backend...

# Copy backend source
COPY backend ./backend/

# Generate Prisma client
WORKDIR /app/backend
RUN pnpm prisma generate

# Build TypeScript
RUN pnpm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

# Explicitly use PORT environment variable in startup
CMD ["sh", "-c", "node dist/server.js"]
