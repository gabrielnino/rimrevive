#!/bin/bash

# Script para probar localmente sin Docker
set -e

echo "🧪 Probando construcción local..."
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm ci
fi

echo "🔨 Construyendo proyecto..."
npm run build

echo "🚀 Iniciando servidor en modo producción..."
echo "   Acceso: http://localhost:3000"
echo "   Detener con: Ctrl+C"
npm start
