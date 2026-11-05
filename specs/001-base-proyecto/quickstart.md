# Quickstart: Base del proyecto

## Requisitos

- Node.js 24 o superior
- Cadena de conexión de `pf_control` en Neon

## Levantar el proyecto

1. Instalar: `npm install`
2. Copiar `apps/api/.dev.vars.example` a `apps/api/.dev.vars` y pegar la cadena en `DATABASE_URL`.
3. Iniciar: `npm run dev`

## Comprobar

| Dirección | Resultado esperado |
|---|---|
| `http://localhost:3000` | Página de inicio con la marca |
| `http://localhost:3000/estado` | Front, back y base de datos en verde |
| `http://localhost:3000/vista-previa` | Plantilla con los 5 menús y los componentes |
| `http://localhost:8787/api/salud` | JSON del [contrato](contracts/salud.md) |

Con una cadena incorrecta, `/estado` debe mostrar la base en rojo y el back en verde. Con el back apagado, debe mostrar un aviso claro.

## Pruebas

| Comando | Qué ejecuta |
|---|---|
| `npm run verificar` | Estilo, tipos y regla de capas |
| `npm run test:unit` | Unitarias con cobertura |
| `npm run test:integracion` | Integración; necesita `TEST_DATABASE_URL` |
| `npm run test:e2e` | End-to-end y accesibilidad |
