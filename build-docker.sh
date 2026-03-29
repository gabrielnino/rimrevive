#!/bin/bash

# Script para construir y ejecutar contenedor Next.js
set -e

echo "🔨 Construyendo imagen Docker para Next.js..."
docker build -t nextjs-rimrevive:latest .

echo "✅ Imagen construida: nextjs-rimrevive:latest"

# Verificar si ya existe contenedor
if docker ps -a --format '{{.Names}}' | grep -q '^nextjs-rimrevive-container$'; then
    echo "🔄 Deteniendo y eliminando contenedor anterior..."
    docker stop nextjs-rimrevive-container 2>/dev/null || true
    docker rm nextjs-rimrevive-container 2>/dev/null || true
fi

echo "🚀 Ejecutando nuevo contenedor..."
docker run -d \
    --name nextjs-rimrevive-container \
    --network web-network \
    -p 3000:3000 \
    --restart unless-stopped \
    nextjs-rimrevive:latest

echo "✅ Contenedor ejecutándose: nextjs-rimrevive-container"
echo "📊 Verificar logs: docker logs nextjs-rimrevive-container"
echo "🌐 Acceso interno: http://nextjs-rimrevive-container:3000"
