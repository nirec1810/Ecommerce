# Ecommerce Front (React)

## Requisitos
- Node.js 18+

## Configuración
Crea un archivo `.env` (opcional):

- `VITE_API_BASE_URL` (ej: `http://localhost:8080` o tu API Gateway)
  - Si no lo defines, se usará la misma URL del front (útil si tienes proxy/reverse proxy).

## Ejecutar
```bash
npm install
npm run dev
```


## Opción A (Recomendada)
Incluye:
- React Router DOM
- Axios + interceptor JWT
- TailwindCSS

### Seguridad (JWT)
- Login: `POST /api/security/loginPrueba`
- Token: `localStorage.access_token`
- Se agrega `Authorization: Bearer <token>` automáticamente en requests.

### Rutas principales (Lazy Loaded)
- `/login`
- `/products` (catálogo)
- `/products/:id` (detalle)
- `/customers/:id` (perfil)
- `/customers/:id/edit` (actualización)
