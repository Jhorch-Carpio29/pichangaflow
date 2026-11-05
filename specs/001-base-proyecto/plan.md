# Implementation Plan: Base del proyecto

**Branch**: `001-base-proyecto` | **Date**: 2026-11-05 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-base-proyecto/spec.md`

## Summary

Crear el monorepo con el front, el back y el código compartido, conectar el back con `pf_control` mediante un chequeo de salud, y dejar el sistema de diseño y la plantilla de panel que usarán los 5 roles. Las pruebas y GitHub Actions protegen ese orden desde el primer día.

## Technical Context

**Language/Version**: TypeScript 5 estricto · Node.js 24 o superior

**Primary Dependencies**: Next.js 16.4, React 19.3, Tailwind CSS 4, componentes estilo shadcn/ui sobre Radix, lucide-react · Hono 4, `@hono/zod-openapi`, Zod 4, postgres.js 3 · Wrangler 4

**Storage**: Neon PostgreSQL 17, base `pf_control`. Solo se ejecuta `SELECT 1`; no hay tablas nuevas

**Testing**: Vitest (unitarias e integración) · Playwright y axe-core (end-to-end y accesibilidad) · dependency-cruiser (regla de capas)

**Target Platform**: Navegadores de RNF-COM-01. Back en runtime de Workers con `wrangler dev`; front con `next dev` en local

**Project Type**: Aplicación web en monorepo con npm workspaces

**Performance Goals**: LCP ≤ 2.5 s en 4G (RNF-REN-03) · CI ≤ 15 min (RNF-CAL-04)

**Constraints**: WCAG 2.1 AA · desde 360 px de ancho · sin secretos en git · solo APIs compatibles con Workers en el back

**Scale/Scope**: 1 ruta de API, 5 páginas (`/`, `/estado`, `/vista-previa`, no encontrado, error), 11 familias de componentes y 5 menús de rol

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Cumple | Cómo |
|---|---|---|
| I. Primero la especificación | Sí | Spec, plan y tareas antes del código; la spec cita sus RNF |
| II. Cada empresa, aislada | No aplica aún | Sin datos de empresa. La conexión queda detrás de un puerto para la 002 |
| III. Arquitectura limpia | Sí | Cuatro capas, puerto para la base y regla de importaciones en CI. El front solo habla con el back |
| IV. Las cuatro pruebas | Sí, con una salvedad | Unitarias, integración y end-to-end nacen aquí. La de carga no aplica: no hay flujo de negocio. Empieza con la carpeta ya existente |
| V. Reservas y dinero | No aplica aún | El formato de soles recibe céntimos enteros |
| VI. Seguridad y privacidad | Sí | Cabeceras de seguridad, secretos en `.dev.vars` y chequeo sin datos internos |
| VII. Gasto mínimo | Sí | Todo gratis. Sin dependencias "por si acaso" |
| VIII. Paneles claros y en español | Sí | Español del Perú, hora de Lima, móvil primero y WCAG AA. El tiempo real llega con su módulo |

Resultado: pasa, antes y después del diseño. No hay violaciones que justificar.

## Project Structure

### Documentation (this feature)

```text
specs/001-base-proyecto/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/salud.md
├── checklists/requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
package.json                     Workspaces y comandos comunes
tsconfig.base.json               Reglas estrictas de TypeScript
eslint.config.mjs
.dependency-cruiser.cjs          Regla de capas
vitest.config.ts
playwright.config.ts
.github/workflows/ci.yml

packages/shared/src/
├── formato/                     Soles, fechas y horas de Perú
├── salud/                       Esquema compartido del chequeo
└── index.ts

apps/api/
├── wrangler.jsonc
├── .dev.vars.example
└── src/
    ├── domain/salud/            Regla pura del estado general
    ├── application/
    │   ├── puertos/             VerificadorBaseDatos
    │   └── casos-de-uso/        ConsultarSalud
    ├── infrastructure/
    │   ├── base-de-datos/       Adaptador PostgreSQL
    │   └── config/              Lectura y validación del entorno
    ├── interface/http/
    │   ├── app.ts
    │   ├── middleware/          Cabeceras y errores
    │   └── rutas/
    └── index.ts                 Punto de entrada: une las capas

apps/web/src/
├── app/
│   ├── layout.tsx · page.tsx · not-found.tsx · error.tsx · globals.css
│   ├── estado/                  Página de estado
│   └── vista-previa/            Solo en desarrollo
├── components/
│   ├── ui/                      Componentes base
│   ├── panel/                   Plantilla: menú, barra superior
│   ├── marca/                   Logo
│   └── portada/                 Fondo y mapa animados
├── config/menus.ts              Menú de cada rol
└── lib/                         Utilidades y cliente del back

tests/
├── pruebas-unitarias/{api,web}/
├── pruebas-de-integracion/
└── pruebas-end-to-end/
```

**Structure Decision**: Se usa la estructura ya aprobada en la constitución y en `arquitectura.md`. El front se organiza por responsabilidad y los módulos de negocio agregarán sus carpetas en `src/modulos/` cuando existan.

## Complexity Tracking

Sin violaciones.
