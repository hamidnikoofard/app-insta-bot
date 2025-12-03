# --- STAGE 1: Dependency Installation and Build ---
# Use a specific, stable Node version for building
FROM node:20-alpine AS builder
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BASE_API_URL=https://direshop.shop/api

WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm install
COPY . .
RUN npm run build


# --- STAGE 2: Production Runtime ---
# Use a lighter base image for the final production environment
FROM node:20-alpine AS runner

WORKDIR /app
ENV PORT 3000
EXPOSE 3000
COPY --from=builder /app/package.json ./

# Install only production dependencies
# The build output is self-contained, but some dependencies might be needed for the server.
RUN npm install --only=production

# Copy the critical build output and static assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Command to start the Next.js production server
CMD ["npm", "start"]