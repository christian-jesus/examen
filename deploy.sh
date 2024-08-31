#!/bin/bash

# Variables
IMAGE_NAME="miusuario/mi-app-node"  # Cambia 'miusuario' por tu usuario de Docker Hub
TAG="latest"

# Construir la imagen de Docker
echo "Construyendo la imagen de Docker..."
docker build -t $IMAGE_NAME:$TAG .

# Iniciar sesión en Docker Hub (te pedirá usuario y contraseña)
echo "Iniciando sesión en Docker Hub..."
docker login

# Subir la imagen a Docker Hub
echo "Subiendo la imagen a Docker Hub..."
docker push $IMAGE_NAME:$TAG

echo "Despliegue completado. Imagen subida como $IMAGE_NAME:$TAG"
