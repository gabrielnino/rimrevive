#!/bin/bash

# Script preciso para actualizar Nginx
set -e

echo "🔧 Actualizando Nginx con proxy Next.js..."

# Archivos temporales
CURRENT_CONF="/tmp/nginx-current-$$.conf"
NEW_CONF="/tmp/nginx-new-$$.conf"

# Extraer configuración actual
echo "📋 Extrayendo configuración actual..."
docker exec html-server-final-fix-container cat /etc/nginx/nginx.conf > "$CURRENT_CONF"

# Encontrar línea exacta donde insertar (después del location / {)
echo "🔍 Buscando punto de inserción..."
LOCATION_LINE=$(grep -n "location / {" "$CURRENT_CONF" | head -1 | cut -d: -f1)

if [ -z "$LOCATION_LINE" ]; then
    echo "❌ No se encontró 'location / {' en la configuración"
    exit 1
fi

echo "✅ Encontrado location / en línea $LOCATION_LINE"

# Encontrar el cierre del bloque location /
BRACE_COUNT=0
INSERT_LINE=0
LINE_NUM=$LOCATION_LINE

while IFS= read -r line; do
    if [ $LINE_NUM -ge $LOCATION_LINE ]; then
        # Contar llaves
        if echo "$line" | grep -q "{"; then
            BRACE_COUNT=$((BRACE_COUNT + 1))
        fi
        if echo "$line" | grep -q "}"; then
            BRACE_COUNT=$((BRACE_COUNT - 1))
            if [ $BRACE_COUNT -eq 0 ]; then
                INSERT_LINE=$((LINE_NUM + 1))
                break
            fi
        fi
    fi
    LINE_NUM=$((LINE_NUM + 1))
done < "$CURRENT_CONF"

if [ $INSERT_LINE -eq 0 ]; then
    echo "❌ No se pudo encontrar el cierre del bloque location /"
    exit 1
fi

echo "✅ Insertar después de línea $INSERT_LINE"

# Crear nueva configuración
echo "📝 Creando nueva configuración..."
head -n $INSERT_LINE "$CURRENT_CONF" > "$NEW_CONF"
cat /root/nextjs-rimrevive/nginx-proxy-config-v2.conf >> "$NEW_CONF"
tail -n +$((INSERT_LINE + 1)) "$CURRENT_CONF" >> "$NEW_CONF"

# Copiar al contenedor
echo "📤 Copiando al contenedor..."
docker cp "$NEW_CONF" html-server-final-fix-container:/etc/nginx/nginx.conf

# Probar configuración
echo "🧪 Probando configuración..."
if docker exec html-server-final-fix-container nginx -t; then
    echo "✅ Configuración válida"
    
    # Recargar Nginx
    echo "🔄 Recargando Nginx..."
    docker exec html-server-final-fix-container nginx -s reload
    
    echo ""
    echo "🎉 PROXY CONFIGURADO EXITOSAMENTE"
    echo "================================="
    echo "🌐 URL Next.js: https://rimrevive.store/app/"
    echo "📁 HTML estático: https://rimrevive.store/"
    echo "🔗 Proxy: Nginx → Next.js (puerto 3000)"
    echo ""
    echo "📊 Verificar:"
    echo "   curl -k https://rimrevive.store/app/"
    echo "   docker logs nextjs-rimrevive-container"
else
    echo "❌ Error en configuración Nginx"
    echo "📋 Últimas líneas del error:"
    docker exec html-server-final-fix-container nginx -t 2>&1 | tail -10
    exit 1
fi

# Limpiar
rm -f "$CURRENT_CONF" "$NEW_CONF"
