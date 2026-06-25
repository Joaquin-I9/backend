|Motorepuestos|

integrantes: Risso Aaron , Perez joaquin

Sistema gestión de un negocio de venta de repuestos para motos. Permite administrar productos, stock, clientes y operaciones del negocio a través de una API backend y una interfaz web.

|Descripción breve del sistema|

- Un backend construido con Node.js, Express y Prisma ORM, encargado de exponer una API REST y gestionar la persistencia de datos en una base de datos MySQL.
- Un frontend construido con Vite, encargado de la interfaz de usuario y el consumo de la API del backend.

|Tecnologías utilizadas|

*Backend*
- Node.js
- Express
- Prisma ORM (Prisma 6)
- MySQL

*Frontend*
- Vite
- JavaScript

**Control de versiones*
- Git / GitHub

|Estructura del proyecto|

```text
Motorepuestos/
├── backend/
│   ├── src/
│   ├── prisma/
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

|Instrucciones de instalación|


1. Instalá las dependencias del backend:

   ```bash
   cd backend
   npm install
   ```

2. Configurá las variables de entorno del backend. Creá un archivo `.env` dentro de `backend/` con el siguiente contenido (ajustá los valores a tu entorno):

   ```env
   DATABASE_URL="mysql://usuario:password@localhost:3306/motorepuestos"
   PORT=3000
   ```

3. Ejecutá las migraciones de Prisma para crear la base de datos:

   ```bash
   npx prisma migrate dev
   ```

4. Instalá las dependencias del frontend:

   ```bash
   cd ../frontend
   npm install
   ```

|Instrucciones de ejecución|

1. Levantá el backend (desde la carpeta `backend/`):

   ```bash
   npm run dev
   ```

   El servidor quedará disponible en `http://localhost:3000` (o el puerto definido en `.env`).

2. Levantá el frontend (desde la carpeta `frontend/`), en otra terminal:

   ```bash
   npm run dev
   ```

   La aplicación quedará disponible en `http://localhost:5173` (puerto por defecto de Vite).

3. Con ambos servicios corriendo, el frontend va a poder consumir la API expuesta por el backend.
