# Docker Deployment Guide

This guide explains how to build and run the Yoruverse UI component library using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)

## Quick Start

### Option 1: Using Build Scripts

#### Linux/macOS
```bash
chmod +x docker-build.sh
./docker-build.sh
```

#### Windows
```cmd
docker-build.bat
```

### Option 2: Manual Docker Commands

#### Build the image
```bash
docker build -t yoruverse-ui:latest .
```

#### Run the container
```bash
docker run -d \
  --name yoruverse-ui \
  -p 4321:4321 \
  --restart unless-stopped \
  yoruverse-ui:latest
```

### Option 3: Using Docker Compose

```bash
docker-compose up -d
```

## Accessing the Application

Once the container is running, access the application at:
- **Local**: http://localhost:4321
- **Production**: https://ui.yoruverse.com

## Container Management

### View logs
```bash
docker logs -f yoruverse-ui
```

### Stop the container
```bash
docker stop yoruverse-ui
```

### Start the container
```bash
docker start yoruverse-ui
```

### Remove the container
```bash
docker stop yoruverse-ui
docker rm yoruverse-ui
```

### Remove the image
```bash
docker rmi yoruverse-ui:latest
```

## Docker Configuration

### Dockerfile Stages

1. **base**: Node.js 20 Alpine base image
2. **deps**: Install dependencies with pnpm  
3. **builder**: Build the Astro application
4. **runner**: Nginx Alpine for serving static files

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Node.js environment |
| `HOST` | `0.0.0.0` | Host to bind to |
| `PORT` | `4321` | Port to listen on |

### Exposed Ports

- **4321**: Main application port

### Volume Mounts

No persistent volumes are required for this static site.

## Production Deployment

### With Custom Domain

```bash
docker run -d \
  --name yoruverse-ui \
  -p 80:4321 \
  -e HOST=0.0.0.0 \
  -e PORT=4321 \
  --restart unless-stopped \
  yoruverse-ui:latest
```

### With SSL Proxy (Nginx)

Use with a reverse proxy like Nginx for SSL termination:

```nginx
server {
    listen 443 ssl;
    server_name ui.yoruverse.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Optimization Features

### Multi-stage Build
- Reduces final image size by excluding build dependencies
- Only includes production dependencies in final image

### Alpine Linux Base
- Minimal base image for smaller container size
- Security-focused with fewer attack vectors

### Non-root User
- Runs as dedicated `astro` user for security
- Follows Docker security best practices

### Build Caching
- Leverages Docker layer caching for faster rebuilds
- Dependencies installed separately from source code

## Troubleshooting

### Common Issues

#### Port already in use
```bash
# Check what's using port 4321
lsof -i :4321

# Use different port
docker run -d --name yoruverse-ui -p 3000:4321 yoruverse-ui:latest
```

#### Container won't start
```bash
# Check container logs
docker logs yoruverse-ui

# Check container status
docker ps -a
```

#### Build fails
```bash
# Clean Docker cache
docker system prune

# Rebuild without cache
docker build --no-cache -t yoruverse-ui:latest .
```

### Performance Tuning

#### Memory Limits
```bash
docker run -d \
  --name yoruverse-ui \
  -p 4321:4321 \
  --memory="512m" \
  --cpus="1" \
  yoruverse-ui:latest
```

#### Health Check
```bash
docker run -d \
  --name yoruverse-ui \
  -p 4321:4321 \
  --health-cmd="curl -f http://localhost:4321 || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  yoruverse-ui:latest
```

## Security Considerations

- Container runs as non-root user
- Minimal attack surface with Alpine Linux
- No sensitive data stored in container
- Regular base image updates recommended
- Use official Node.js images only

## CI/CD Integration

This repository includes automated GitHub Actions workflows for building and pushing Docker images.

### Automated Docker Hub Deployment

The repository is configured with GitHub Actions that automatically:
- **Build** multi-architecture Docker images on every push to main
- **Push** images to Docker Hub (`jotis/yoruverse-ui`)
- **Tag** with version numbers for releases
- **Scan** for security vulnerabilities
- **Notify** with deployment status

**Setup Required**: See [GITHUB_ACTIONS.md](./GITHUB_ACTIONS.md) for complete setup instructions.

### Quick Setup
1. Add Docker Hub credentials to GitHub Secrets:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username  
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token
2. Push to main branch to trigger build
3. Image will be available at: `jotis/yoruverse-ui:latest`

### Pull Pre-built Image
```bash
# Pull from Docker Hub (built by GitHub Actions)
docker pull jotis/yoruverse-ui:latest
docker run -d --name yoruverse-ui -p 4321:4321 jotis/yoruverse-ui:latest
```

## Support

For Docker-related issues:
1. Check the container logs: `docker logs yoruverse-ui`
2. Verify Docker is running: `docker version`
3. Check available resources: `docker system df`
4. Review this documentation for common solutions