# Etapa 1: Build de la aplicación
FROM node:20-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalación limpia de dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Generar la versión de producción
RUN npm run build

# Etapa 2: Servidor Web con Nginx
FROM nginx:alpine

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
