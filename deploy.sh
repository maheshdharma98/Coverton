#!/bin/bash
echo "🚀 Coverton — Deployment Script"
echo "================================"

echo ""
echo "📦 Step 1: Installing dependencies..."
npm ci --production
if [ $? -ne 0 ]; then
  echo "❌ npm ci failed. Exiting."
  exit 1
fi
echo "✅ Dependencies installed"

echo ""
echo "🔄 Step 2: Restarting PM2..."
pm2 restart coverton-website
if [ $? -ne 0 ]; then
  echo "⚠️ PM2 restart failed. Trying fresh start..."
  pm2 start ecosystem.config.js
fi
pm2 save
echo "✅ App restarted"

echo ""
echo "📊 Step 3: App status"
pm2 status

echo ""
echo "✅ Deployment complete!"
echo "🌐 Site: https://coverton.in"
