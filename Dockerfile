# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias y los instala
COPY package*.json ./
RUN npm install

# Copia todo el código de la aplicación al contenedor
COPY . .

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
