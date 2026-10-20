# 🛠️ Sistema de Tickets - Soporte Técnico

Aplicación web Full-Stack para la gestión de tickets de soporte técnico. Permite a los usuarios registrar incidentes y a los administradores gestionarlos y cambiar sus estados.

## 🚀 Tecnologías Utilizadas

**Frontend:**
* React.js + Vite
* Tailwind CSS (Diseño responsivo)
* React Router (Navegación SPA)

**Backend:**
* Node.js + Express
* Sequelize (ORM)
* PostgreSQL (Base de datos en Supabase)
* JSON Web Tokens (JWT) para autenticación
* Bcrypt para encriptación de contraseñas

## ⚙️ Características Principales (MVP)

* **Visitantes:** Ver página de inicio y productos.
* **Usuarios (Clientes):** Registrarse, iniciar sesión, crear tickets, ver sus tickets, editar o eliminar sus tickets *solo si están en estado "Abierto"*.
* **Administradores:** Ver todos los tickets del sistema, filtrar por estado, cambiar el estado de un ticket, eliminar tickets y gestionar los roles de los usuarios.
* **Seguridad:** Contraseñas hasheadas, rutas protegidas por rol (JWT), validación de datos en el backend.

## 🛠️ Instalación y Ejecución Local

Sigue estos pasos para correr el proyecto en tu computadora.

### 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/sistema-tickets.git
cd sistema-tickets

### 2. Configurar el Backend
cd backend
npm install

Crea un archivo .env en la carpeta backend con las siguientes variables:
DATABASE_URL=tu_cadena_de_conexion_de_supabase
PORT=3000
JWT_SECRET=tu_secreto_jwt
FRONTEND_URL=http://localhost:5173
CRON_SECRET=tu_secreto_cron

Inicia el servidor:
npm run dev

### 3. Configurar el Frontend
Abrí otra terminal en la raíz del proyecto y ejecutá:
cd frontend
npm install

Crea un archivo .env en la carpeta frontend:
VITE_API_URL=http://localhost:3000/api

Inicia la aplicación:
npm run dev

## 📌 Endpoints Principales de la API

* POST /api/auth/register - Registro de usuario
* POST /api/auth/login - Inicio de sesión (devuelve JWT)
* GET /api/auth/me - Obtener datos del usuario autenticado
* GET /api/tickets - Listar tickets propios
* POST /api/tickets - Crear ticket
* GET /api/tickets/all - Listar todos los tickets (Solo Admin)
* PATCH /api/tickets/:id - Editar ticket (Solo dueño, si está Abierto)
* PATCH /api/tickets/:id/status - Cambiar estado del ticket (Solo Admin)
* GET /api/users - Listar usuarios (Solo Admin)

---
*Desarrollado como proyecto final para la materia Bases de Datos 2.*