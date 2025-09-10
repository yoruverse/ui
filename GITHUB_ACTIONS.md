# GitHub Actions Setup Guide

This guide explains how to set up the automated Docker build and push workflow using GitHub Actions.

## Prerequisites

1. **Docker Hub Account**: You need a Docker Hub account where images will be pushed
2. **GitHub Repository**: The workflow runs on your GitHub repository
3. **Repository Secrets**: Required secrets must be configured in your GitHub repository

## Required Secrets

You need to add the following secrets to your GitHub repository:

### 1. Docker Hub Credentials

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret:

#### DOCKERHUB_USERNAME
- **Name**: `DOCKERHUB_USERNAME`
- **Value**: Your Docker Hub username (e.g., `yoruverse`)

#### DOCKERHUB_TOKEN
- **Name**: `DOCKERHUB_TOKEN` 
- **Value**: Your Docker Hub access token

**To create a Docker Hub access token:**
1. Go to [Docker Hub](https://hub.docker.com)
2. Sign in to your account
3. Click on your username → Account Settings
4. Go to Security → Access Tokens
5. Click "New Access Token"
6. Name: `github-actions-yoruverse-ui`
7. Access permissions: `Read, Write, Delete`
8. Click "Generate"
9. Copy the token (you won't see it again!)

## Workflow Configuration

### Image Configuration

The workflow is configured to push to:
- **Registry**: Docker Hub (`docker.io`)
- **Repository**: `yoruverse/ui`
- **Tags**: 
  - `latest` (for main branch)
  - `main` (for main branch)
  - Version tags (for tagged releases like `v1.0.0`)

### Supported Platforms

The workflow builds multi-architecture images:
- `linux/amd64` (x86_64)
- `linux/arm64` (ARM64/Apple Silicon)

## Workflow Triggers

### Automatic Triggers
- **Push to main branch**: Builds and pushes image with `latest` and `main` tags
- **Tagged releases**: Builds and pushes with version tags (e.g., `v1.0.0`, `1.0`, `1`)
- **Pull requests**: Builds image but doesn't push (for testing)

### Manual Trigger
You can also trigger the workflow manually:
1. Go to your repository on GitHub
2. Click "Actions" tab
3. Select "Build and Push Docker Image"
4. Click "Run workflow"

## Workflow Features

### 🚀 Build and Push Workflow
- **File**: `.github/workflows/docker-build-push.yml`
- Builds optimized Docker image using multi-stage build
- Pushes to Docker Hub with appropriate tags
- Uses GitHub Actions cache for faster builds
- Supports multiple CPU architectures

### 📢 Deployment Notifications
- **File**: `.github/workflows/deploy-notify.yml`
- Runs after successful build
- Posts commit comment with deployment details
- Creates deployment status
- Runs security vulnerability scan

### 🔒 Security Scanning
- Integrated Trivy vulnerability scanner
- Scans Docker images for security vulnerabilities
- Results uploaded to GitHub Security tab
- Runs on every successful build

## Usage Examples

### Viewing Build Status

Check the status of your builds:
- Go to your repository → Actions tab
- Look for "Build and Push Docker Image" workflow
- Green checkmark = successful build and push
- Red X = failed build

### Pulling the Built Image

After a successful workflow run:

```bash
# Pull latest image
docker pull yoruverse/ui:latest

# Run the container
docker run -d --name yoruverse-ui -p 4321:4321 yoruverse/ui:latest

# Access your app
open http://localhost:4321
```

### Version Releases

To create a versioned release:

```bash
# Tag your commit
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

This will trigger the workflow to build and push:
- `yoruverse/ui:v1.0.0`
- `yoruverse/ui:1.0.0` 
- `yoruverse/ui:1.0`
- `yoruverse/ui:1`

## Workflow Status Badges

Add status badges to your README.md:

```markdown
![Docker Build](https://github.com/yoruverse/ui/actions/workflows/docker-build-push.yml/badge.svg)
![Docker Image Size](https://img.shields.io/docker/image-size/yoruverse/ui/latest)
![Docker Pulls](https://img.shields.io/docker/pulls/yoruverse/ui)
```

## Docker Hub Integration

After the first successful workflow run, your Docker Hub repository will show:
- **Repository**: https://hub.docker.com/r/yoruverse/ui
- **Tags**: All available versions
- **Architecture**: Supported platforms
- **Automated builds**: Linked to GitHub

## Troubleshooting

### Common Issues

#### 1. Authentication Failed
```
Error: Cannot perform an interactive login from a non TTY device
```
**Solution**: Check that `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets are correctly set.

#### 2. Repository Not Found
```
Error: repository yoruverse/ui not found
```
**Solution**: 
- Make sure the Docker Hub repository exists, or
- Update the `IMAGE_NAME` in the workflow to match your repository

#### 3. Permission Denied
```
Error: denied: requested access to the resource is denied
```
**Solution**: Verify your Docker Hub access token has `Read, Write, Delete` permissions.

#### 4. Build Failed
Check the workflow logs for specific errors:
1. Go to Actions tab in your repository
2. Click on the failed workflow run
3. Expand the failed step to see detailed logs

### Manual Testing

Test the workflow locally using [act](https://github.com/nektos/act):

```bash
# Install act
brew install act  # macOS
# or
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash  # Linux

# Test the workflow
act push -s DOCKERHUB_USERNAME=your-username -s DOCKERHUB_TOKEN=your-token
```

## Monitoring and Maintenance

### Regular Tasks
1. **Update base images**: Keep Node.js and nginx versions current
2. **Rotate tokens**: Refresh Docker Hub access tokens periodically
3. **Monitor builds**: Check for failed builds and fix issues promptly
4. **Security scans**: Review vulnerability scan results in Security tab

### Performance Optimization
- Workflow uses GitHub Actions cache for faster builds
- Multi-stage Docker build minimizes final image size
- Parallel platform builds for efficiency

## Advanced Configuration

### Custom Tags
Modify `.github/workflows/docker-build-push.yml` to add custom tagging:

```yaml
tags: |
  type=ref,event=branch
  type=ref,event=pr
  type=semver,pattern={{version}}
  type=raw,value=latest,enable={{is_default_branch}}
  type=raw,value={{date 'YYYYMMDD'}}-{{sha}}
```

### Different Registry
To use GitHub Container Registry instead of Docker Hub:

```yaml
env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}
```

### Build Arguments
Add build arguments to your Dockerfile and workflow:

```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    build-args: |
      NODE_VERSION=20
      BUILD_DATE=${{ steps.date.outputs.date }}
    # ... other options
```

## Support

For issues with the GitHub Actions workflow:
1. Check the [GitHub Actions documentation](https://docs.github.com/en/actions)
2. Review workflow logs in the Actions tab
3. Verify secrets are correctly configured
4. Test Docker build locally first