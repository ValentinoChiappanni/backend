#!/bin/sh
set -e

echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy

echo "🌱 Running Prisma seed (if exists)..."
npx prisma db seed || echo "No seed script found"

echo "🚀 Starting application..."
exec node src/index.js
