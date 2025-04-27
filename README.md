![Texto alternativo de la imagen](./src/assets/Logo-PulpoLine.png)

# 🌦️ Weather API con MongoDB - NestJS Backend
Esta es una API RESTful construida con NestJS que proporciona datos meteorológicos y gestión de ciudades favoritas, integrada con WeatherAPI.com.


## 📋 Requisitos Previos

Node.js v16+

npm o yarn

MongoDB (local o Atlas)

## Clave de API de WeatherAPI.com

# 🚀 Instalación

1. Clonar el repositorio

  ```bash

  git clone [https://github.com/jhonshua/backend_technical_test.git]
  cd backend

  ```

2. Instalar dependencias

 ```bash

npm install
# o
yarn install

# Instalar dependencias de Mongoose
npm install @nestjs/mongoose mongoose

  ```
3. Configurar variables de entorno
Crear un archivo .env en la raíz del proyecto con:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/weather-api
# o para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/weather-api

# WeatherAPI
WEATHER_API_KEY=tu_clave_aqui

# App
PORT=3000
NODE_ENV=development

 ```

# 🏃 Ejecución
Modo desarrollo (con watch mode)

```bash
npm run start:dev

 ```

Modo producción

```bash
npm run build
npm run start:prod

 ```

 📚 Endpoints  Weather

GET /weather?city={ciudad} - Obtiene el clima actual

GET /weather/autocomplete?query={texto} - Autocompletado de ciudades

Favorites
GET /favorites - Lista todas las ciudades favoritas

POST /favorites - Añade una ciudad favorita

DELETE /favorites/:city - Elimina una ciudad favorita


```json
{
  "city": "Madrid",
  "weatherData": { ... }
}
 ```

 📂 Estructura Actualizada

 ```bash
backend/
├── config/
│   └── database.config.ts
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── login.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   └── strategies/
│   │       └── jwt.strategy.ts 
│   ├── database/
│   │   └── database.module.ts
│   ├── favorites/
│   │   ├── dto/
│   │   │   └── create-favorite.dto.ts
│   │   ├── entities/
│   │   │   └── favorite.entity.ts
│   │   ├── favorites.controller.ts
│   │   ├── favorites.module.ts
│   │   └── favorites.service.ts
│   ├── help/
│   │   └── help.controller.ts
│   ├── main.ts
│   └── weather/
│       ├── weather.controller.ts
│       ├── weather.module.ts
│       └── weather.service.ts
├── .env
├── .gitignore
├── nest-cli.json
├── package-lock.json
├── package.json
├── README.md
├── test/
└── tsconfig.json
 ```

