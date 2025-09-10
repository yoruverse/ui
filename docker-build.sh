#!/bin/bash

# Build and run Yoruverse UI Docker container

echo "🚀 Building Yoruverse UI Docker image..."

# Build the Docker image
docker build -t yoruverse-ui:latest .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    
    echo "🐳 Starting container..."
    
    # Stop and remove existing container if it exists
    docker stop yoruverse-ui 2>/dev/null || true
    docker rm yoruverse-ui 2>/dev/null || true
    
    # Run the container
    docker run -d \
        --name yoruverse-ui \
        -p 4321:4321 \
        --restart unless-stopped \
        yoruverse-ui:latest
    
    if [ $? -eq 0 ]; then
        echo "✅ Container started successfully!"
        echo "🌐 Access the application at: http://localhost:4321"
        echo "📝 Container logs: docker logs -f yoruverse-ui"
        echo "🛑 Stop container: docker stop yoruverse-ui"
    else
        echo "❌ Failed to start container"
        exit 1
    fi
else
    echo "❌ Failed to build Docker image"
    exit 1
fi