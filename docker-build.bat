@echo off

echo 🚀 Building Yoruverse UI Docker image...

REM Build the Docker image
docker build -t yoruverse-ui:latest .

if %ERRORLEVEL% equ 0 (
    echo ✅ Docker image built successfully!
    
    echo 🐳 Starting container...
    
    REM Stop and remove existing container if it exists
    docker stop yoruverse-ui >nul 2>&1
    docker rm yoruverse-ui >nul 2>&1
    
    REM Run the container
    docker run -d --name yoruverse-ui -p 4321:4321 --restart unless-stopped yoruverse-ui:latest
    
    if %ERRORLEVEL% equ 0 (
        echo ✅ Container started successfully!
        echo 🌐 Access the application at: http://localhost:4321
        echo 📝 Container logs: docker logs -f yoruverse-ui
        echo 🛑 Stop container: docker stop yoruverse-ui
    ) else (
        echo ❌ Failed to start container
        exit /b 1
    )
) else (
    echo ❌ Failed to build Docker image
    exit /b 1
)

pause