# 🌟 Remove.bg Background Remover

Una aplicación para eliminar fondos de imágenes mediante la API de **Remove.bg**.  
El backend está en **Express** y el frontend con **Vite-React**, estilizado con **Tailwind CSS**.

---

## 🚀 Características

- Elimina fondos de imágenes con precisión utilizando la API de Remove.bg.
- Interfaz moderna con React y Tailwind CSS.
- Backend hecho en express

## 🚀 Requisitos

- Node v20.17.0
- Una API key de remove.bg (es gratis https://www.remove.bg/es/api)


---

## 🛠️ Instalación

1. Clona el repositorio:
   ```bash
   git clone (link del repo)


2.- Instalacion - Backend:

- Entra a la carpta backend:
  ```bash
  cd backend
  
- Instala las dependencia ejecutando el siguiente comando.
  ```bash
  npm install

- Por ultimo crea un archivo .env ahi en la raiz de la carpeta backend y colocas lo siguiente:
  ```bash
  REMOVE_BG_API_KEY=jjjjjjjjjjjjjjjjjjjjjj
  REMOVE_BG_API_URL=https://api.remove.bg/v1.0/removebg
  PORT=3000
  
Nota: la api key no debe tener espacios ni comillas


3.- Instalacion -Frontend:

- Entra a la carpta frontend:
  ```bash
  cd frontend

- Instala las dependencia ejecutando el siguiente comando.
  ```bash
  npm install


- Por ultimo crea un archivo .env ahi en la raiz de la carpeta frontend y colocas lo siguiente:
  ```bash
  VITE_API_URL=http://localhost:3000

- Listo disfruta de mi app
