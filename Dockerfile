# Use Node.js Alpine image for smaller size
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --production=false

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install pnpm in builder stage
RUN npm install -g pnpm

# Build the application
RUN pnpm run build

# Production image using nginx for static serving
FROM nginx:alpine AS runner

# Create a non-root user for nginx
RUN addgroup -g 1001 -S nodejs && \
    adduser -S astro -u 1001 -G nodejs

# Copy the built static files from builder stage
COPY --from=builder --chown=astro:nodejs /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY --chown=astro:nodejs <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 4321;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    # Handle client-side routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
EOF

# Change nginx to run on port 4321 and as non-root user
RUN sed -i 's/listen.*80;/listen 4321;/g' /etc/nginx/nginx.conf && \
    sed -i 's/user.*nginx;/user astro;/g' /etc/nginx/nginx.conf && \
    touch /var/run/nginx.pid && \
    chown -R astro:nodejs /var/run/nginx.pid && \
    chown -R astro:nodejs /var/cache/nginx && \
    chown -R astro:nodejs /var/log/nginx && \
    chown -R astro:nodejs /etc/nginx/conf.d

USER astro

EXPOSE 4321

# Set environment to production
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:4321/ || exit 1

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]