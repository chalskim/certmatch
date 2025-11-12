#!/bin/sh

# Backend server (NestJS)
pkill -f "npm start" >/dev/null 2>&1 || true
cd '/Users/cheolhomaegbug/src/certmatch/Server' && npm start &

# Frontend (Expo web)
# Kill existing Expo process on port 8084 if any
lsof -t -i:8084 | xargs -r kill

# Start Expo in CI (non-interactive) mode and clear cache
cd /Users/cheolhomaegbug/src/certmatch/mobile_front && CI=1 npx expo start --web -c --port 8084