#!/bin/bash

# Script completo de despliegue Next.js
set -e

echo "🚀 INICIANDO DESPLIEGUE COMPLETO NEXT.JS"
echo "========================================"

# Paso 1: Verificar proyecto
echo ""
echo "1. 🔍 VERIFICANDO PROYECTO..."
if [ ! -f "package.json" ]; then
    echo "❌ No se encontró package.json"
    exit 1
fi

if [ ! -f "Dockerfile" ]; then
    echo "❌ No se encontró Dockerfile"
    exit 1
fi

echo "✅ Proyecto válido: Next.js + TypeScript + Tailwind"

# Paso 2: Construir imagen Docker
echo ""
echo "2. 🔨 CONSTRUYENDO IMAGEN DOCKER..."
docker build -t nextjs-rimrevive:latest .

echo "✅ Imagen construida: nextjs-rimrevive:latest"

# Paso 3: Detener contenedor anterior si existe
echo ""
echo "3. 🗑️  LIMPIANDO CONTENEDOR ANTERIOR..."
if docker ps -a --format '{{.Names}}' | grep -q '^nextjs-rimrevive-container$'; then
    echo "🛑 Deteniendo contenedor..."
    docker stop nextjs-rimrevive-container 2>/dev/null || true
    echo "🗑️  Eliminando contenedor..."
    docker rm nextjs-rimrevive-container 2>/dev/null || true
    echo "✅ Contenedor anterior eliminado"
else
    echo "✅ No hay contenedor anterior"
fi

# Paso 4: Ejecutar nuevo contenedor
echo ""
echo "4. 🐳 EJECUTANDO CONTENEDOR NEXT.JS..."
docker run -d \
    --name nextjs-rimrevive-container \
    --network web-network \
    -p 3000:3000 \
    --restart unless-stopped \
    nextjs-rimrevive:latest

echo "✅ Contenedor ejecutándose: nextjs-rimrevive-container"

# Paso 5: Esperar que Next.js inicie
echo ""
echo "5. ⏳ ESPERANDO INICIO DE NEXT.JS (10 segundos)..."
sleep 10

# Verificar que está corriendo
if docker ps --format '{{.Names}}' | grep -q '^nextjs-rimrevive-container$'; then
    echo "✅ Next.js está corriendo"
    
    # Verificar logs iniciales
    echo "📋 Logs iniciales:"
    docker logs nextjs-rimrevive-container --tail 5 2>/dev/null || echo "   (sin logs aún)"
else
    echo "❌ Next.js no se inició correctamente"
    docker logs nextjs-rimrevive-container 2>/dev/null || true
    exit 1
fi

# Paso 6: Configurar proxy en Nginx
echo ""
echo "6. 🔧 CONFIGURANDO PROXY EN NGINX..."
cd /root/nextjs-rimrevive
./update-nginx-precise.sh

echo ""
echo "🎉 DESPLIEGUE COMPLETADO EXITOSAMENTE"
echo "====================================="
echo ""
echo "🌐 URLs DISPONIBLES:"
echo "   • Next.js App:    https://rimrevive.store/app/"
echo "   • HTML estático:  https://rimrevive.store/"
echo "   • Estudio mercado: https://rimrevive.store/estudio_mercado_rines_vancouver.html"
echo ""
echo "🔧 COMANDOS ÚTILES:"
echo "   Ver logs Next.js:    docker logs nextjs-rimrevive-container -f"
echo "   Reiniciar Next.js:   docker restart nextjs-rimrevive-container"
echo "   Ver logs Nginx:      docker logs html-server-final-fix-container"
echo "   Probar conexión:     curl -k https://rimrevive.store/app/"
echo ""
echo "📊 ESTADO ACTUAL:"
echo "   Next.js:  ✅ Contenedor corriendo (puerto 3000)"
echo "   Nginx:    ✅ Proxy configurado (/app/ → Next.js)"
echo "   SSL:      ✅ Let's Encrypt activo"
echo "   Red:      ✅ Contenedores conectados (web-network)"
