#!/bin/bash

# Script para actualizar Nginx con configuración proxy
set -e

echo "🔧 Actualizando configuración Nginx con proxy Next.js..."

# Crear configuración temporal con proxy
CONFIG_FILE="/tmp/nginx-with-proxy.conf"

# Extraer configuración actual
docker exec html-server-final-fix-container cat /etc/nginx/nginx.conf > "$CONFIG_FILE"

# Insertar configuración proxy después del último location /
if grep -q "location / {" "$CONFIG_FILE"; then
    # Encontrar línea después del último location /
    LINE_NUM=$(grep -n "location / {" "$CONFIG_FILE" | tail -1 | cut -d: -f1)
    if [ -n "$LINE_NUM" ]; then
        # Calcular línea para insertar (después del bloque location /)
        INSERT_LINE=$((LINE_NUM + 20)) # Aproximadamente después del bloque
        
        # Crear nuevo archivo con proxy insertado
        head -n $INSERT_LINE "$CONFIG_FILE" > "${CONFIG_FILE}.new"
        cat /root/nextjs-rimrevive/nginx-proxy-config.conf >> "${CONFIG_FILE}.new"
        tail -n +$((INSERT_LINE + 1)) "$CONFIG_FILE" >> "${CONFIG_FILE}.new"
        
        mv "${CONFIG_FILE}.new" "$CONFIG_FILE"
        echo "✅ Configuración proxy insertada en línea $INSERT_LINE"
    fi
fi

# Copiar al contenedor
docker cp "$CONFIG_FILE" html-server-final-fix-container:/etc/nginx/nginx.conf

# Probar configuración
if docker exec html-server-final-fix-container nginx -t; then
    echo "✅ Configuración Nginx válida"
    
    # Recargar Nginx
    docker exec html-server-final-fix-container nginx -s reload
    echo "🔄 Nginx recargado con nueva configuración"
    
    echo ""
    echo "🎯 Proxy configurado:"
    echo "   https://rimrevive.store/app/ → Next.js (puerto 3000)"
    echo "   https://rimrevive.store/ → HTML estático actual"
else
    echo "❌ Error en configuración Nginx"
    exit 1
fi
