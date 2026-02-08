# Tienda (Frontend + Backend)

Proyecto full‑stack para administración de una tienda.

- **Frontend:** React + Vite + Tailwind
- **Backend:** Node.js + Express (ESM) + Swagger UI

---

## Estructura

- `frontend/` — aplicación web (Vite)
- `backend/` — API (Express)

---

## Requisitos

- **Node.js** 18+ (recomendado 20+)
- (Opcional) **MySQL** si vas a conectar base de datos (ver variables en `backend/.env.example`)

---

## Variables de entorno

### Backend

1. Copia el ejemplo:

```bash
cd backend
copy .env.example .env
```

2. Ajusta lo necesario en `backend/.env`:

- `APP_PORT` (por defecto `3000`)
- `FRONTEND_URL` (por defecto `http://localhost:5173`)
- Variables `DB_*` (si aplica)
- Variables `MAIL_*` (si aplica)

### Frontend

El frontend usa `VITE_API_URL`.

- Archivo: `frontend/.env`
- Ejemplo:

```dotenv
VITE_API_URL=http://localhost:3000/api/v1
```

---

## Instalación

En dos terminales (una para backend y otra para frontend):

### 1) Instalar dependencias

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

### 2) Correr en desarrollo

**Backend**

```bash
cd backend
npm run dev
```

**Frontend**

```bash
cd frontend
npm run dev
```

- Frontend: Vite elige `http://localhost:5173/` (si está ocupado, usa otro puerto y lo muestra en consola)
- Backend: `http://localhost:3000/`

---

## API

- **Base URL (local):** `http://localhost:3000/api/v1`
- **Swagger UI:** `http://localhost:3000/api-docs/v1`
- **Health check:** `GET /api/v1/health`

---

## Scripts

### Backend (`backend/package.json`)

- `npm run dev` — inicia con nodemon
- `npm start` — inicia sin nodemon

### Frontend (`frontend/package.json`)

- `npm run dev` — inicia Vite
- `npm run build` — build de producción
- `npm run preview` — previsualizar build

---

## Troubleshooting

- Si ves `Cannot find package 'swagger-ui-express'` en el backend: ejecuta `npm install` dentro de `backend/`.
- Si Vite dice `Port 5173 is in use`: usa la URL alternativa que imprime (por ejemplo `5174`).
