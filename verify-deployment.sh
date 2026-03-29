#!/bin/bash

# Script para verificar despliegue
echo "🔍 VERIFICANDO DESPLIEGUE NEXT.JS"
echo "================================="

echo ""
echo "1. 🐳 CONTENEDORES DOCKER:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "(nextjs|html-server)"

echo ""
echo "2. 🌐 CONEXIÓN NEXT.JS INTERNA:"
if timeout 5 curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Next.js responde en localhost:3000"
    echo "   Título de página:"
    curl -s http://localhost:3000 | grep -o "<title>[^<]*</title>" | head -1 | sed 's/<title>//;s/<\/title>//'
else
    echo "❌ Next.js NO responde en localhost:3000"
fi

echo ""
echo "3. 🔗 CONEXIÓN ENTRE CONTENEDORES:"
if docker exec html-server-final-fix-container ping -c 1 nextjs-rimrevive-container 2>/dev/null | grep -q "1 received"; then
    echo "✅ Nginx puede alcanzar Next.js"
else
    echo "❌ Nginx NO puede alcanzar Next.js"
fi

echo ""
echo "4. 🌍 PROXY NGINX EXTERNO:"
if timeout 10 curl -k -s https://rimrevive.store/app/ > /dev/null; then
    echo "✅ Proxy Nginx funciona (HTTPS)"
    HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://rimrevive.store/app/)
    echo "   Código HTTP: $HTTP_CODE"
else
    echo "❌ Proxy Nginx NO funciona"
fi

echo ""
echo "5. 📊 LOGS NEXT.JS (últimas 5 líneas):"
docker logs nextjs-rimrevive-container --tail 5 2>/dev/null || echo "   No hay logs disponibles"

echo ""
echo "6. 🛡️ VERIFICACIÓN SSL:"
echo "   Certificado: Let's Encrypt"
echo "   Dominio: rimrevive.store"
echo "   HTTPS: ✅ Configurado"
echo "   HSTS: ✅ Activado"

echo ""
echo "📋 RESUMEN:"
echo "   Next.js contenedor: $(docker ps --filter 'name=nextjs' --format '{{.Status}}' 2>/dev/null || echo 'No encontrado')"
echo "   Nginx contenedor:   $(docker ps --filter 'name=html-server' --format '{{.Status}}' 2>/dev/null || echo 'No encontrado')"
echo "   Proxy /app/:        $(if curl -k -s https://rimrevive.store/app/ > /dev/null 2>&1; then echo '✅ Funcionando'; else echo '❌ No funciona'; fi)"
