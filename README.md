# TP-Desarrollo-Software

## Información del Grupo

**Integrantes del grupo:** Tomas Yasparra (48083), Facundo Picia (48072)  🎓✨
**Profesores:** Adrián Meca & Julián Butti  **Comisión:** 3k01 

## Repositorio Fullstack

[Repositorio en GitHub](https://github.com/cufardixx/TP_DSW_2024_3K1) 📁💻

## Video de las principales funcionalidades de la aplicación

[Video de demostración](https://www.youtube.com/watch?v=4b8GKbPP0IY) 📽️🎥

---

## Descripción del Trabajo

**EventLife** es una aplicación web diseñada para facilitar la compra y venta de entradas para diversos tipos de eventos, como recitales, fiestas, festivales o bares nocturnos. 🎟️🎉

La plataforma cuenta con dos tipos de usuarios: **clientes** y **administradores**. 

### Funcionalidades para Clientes

1. **Registro e Inicio de Sesión:** Registro con datos personales o inicio de sesión con correo y contraseña.
2. **Gestión de Eventos:**
   - Crear eventos con detalles como título, descripción, fecha, ubicación, categoría y capacidad.
   - Visualizar, editar, eliminar y ordenar eventos creados.
3. **Compra de Entradas:**
   - Buscar eventos mediante filtros por categoría o utilizando una barra de búsqueda.
   - Finalizar la compra con un correo de confirmación y un código QR como entrada al evento.
   - Visualizar entradas adquiridas en un apartado personal.

### Funcionalidades para Administradores

1. **Gestión de Categorías:** Crear y administrar las categorías de los eventos.
2. **Gestión de Usuarios:** Panel para ver y gestionar a los usuarios registrados en la plataforma.

EventLife ofrece una experiencia cómoda y centralizada para organizar eventos, comprar entradas y gestionar actividades relacionadas. 🌐🤝

---

## Tecnologías Utilizadas

### Backend

- **Framework:** Express.js con TypeScript 
- **Base de datos:** MySQL (alojada en Clever Cloud)  🗄️☁️
- **ORM:** TypeORM
- **Autenticación:** JSON Web Tokens (JWT)
- **Encriptación:** bcrypt 🔐
- **Validación de Datos:** Zod
- **Envío de Correos:** Nodemailer 📧
- **Generación de Códigos QR:** QRCode 📱
- **Configuración:** dotenv 🛠️

### Frontend

- **Framework:** Angular con TypeScript 🌐
- **Estilo:** Bootstrap 🎨

### Despliegue

- **Frontend:** Netlify 🌍   [Link](https://event-life.netlify.app)
- **Backend:** Render.com 🚀 [Link](https://backend-eventlife.onrender.com)
- - **BD:** Clever Cloud 💿  [Link](https://www.clever-cloud.com/)

---

## Instrucciones de Instalación y Ejecución 🚀📥

### Clonar el repositorio

```sh
git clone https://github.com/cufardixx/TP_DSW_2024_3K1.git
```

### Configuración del Backend

1. Navega hacia la carpeta del backend:
   ```sh
   cd backend
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:
   ```plaintext
   DB_HOST=<tu-host>
   DB_PORT=<tu-puerto>
   DB_USER=<tu-usuario>
   DB_PASSWORD=<tu-contraseña>
   DB_NAME=<nombre-de-tu-bd>
   JWT_SECRET=<tu-secreto-jwt>
   EMAIL_HOST=<smtp-host>
   EMAIL_PORT=<smtp-puerto>
   EMAIL_USER=<smtp-usuario>
   EMAIL_PASSWORD=<smtp-contraseña>
   ```
4. Ejecuta el servidor en modo desarrollo:
   ```sh
   npm run dev
   ```

### Configuración del Frontend

1. Navega hacia la carpeta del frontend:
   ```sh
   cd frontend
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Ejecuta el frontend:
   ```sh
   npm start
   ```

---

## Endpoints del Backend 🔄🛠️

[Docuemtacion de API (posman)](https://documenter.getpostman.com/view/17463908/2sAYHzF2YC)


## Modelo de Datos 🗂️📝

![BD-model](https://github.com/user-attachments/assets/b9073a30-146a-48f5-a714-da181598b182)


---

## Capturas de Pantalla 📸🖼️

GIFs de algunas funcionalidades

![funcion de compra](https://github.com/user-attachments/assets/8b8ab58c-cb85-45e2-af85-b192b3887248)
![inicio de sesion (2)](https://github.com/user-attachments/assets/3464a6b6-ba78-46a9-b594-2b9a95c90f96)



---

## Próximos Pasos (Roadmap) 🛤️✨



---



