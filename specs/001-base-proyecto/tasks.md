# Tasks: Base del proyecto

**Input**: Documentos de `specs/001-base-proyecto/`

**Tests**: Obligatorios por el principio IV de la constitución.

**Formato**: `[P]` se puede hacer en paralelo. `[US#]` indica la historia de usuario.

## Phase 1: Setup

- [X] T001 Crear workspaces, comandos comunes y dependencias de desarrollo en `package.json`
- [X] T002 Quitar `apps/web/package-lock.json`, los SVG de plantilla de `apps/web/public/` y reescribir `apps/web/README.md`
- [X] T003 [P] Crear reglas estrictas compartidas en `tsconfig.base.json`
- [X] T004 [P] Crear reglas de estilo en `eslint.config.mjs`
- [X] T005 [P] Crear `packages/shared/package.json` y `packages/shared/tsconfig.json`
- [X] T006 [P] Crear `apps/api/package.json`, `apps/api/tsconfig.json`, `apps/api/wrangler.jsonc` y `apps/api/.dev.vars.example`
- [X] T007 Ajustar `apps/web/package.json`, `apps/web/tsconfig.json` y `apps/web/next.config.ts` al monorepo
- [X] T008 [P] Configurar pruebas en `vitest.config.mts` y `playwright.config.ts`
- [X] T009 Leer las guías de Next 16 en `node_modules/next/dist/docs/` antes de escribir código del front

## Phase 2: Foundational

- [X] T010 [P] Prueba de formato de soles, fechas y horas en `tests/pruebas-unitarias/web/formato.test.ts`
- [X] T011 [P] Implementar formato peruano en `packages/shared/src/formato/index.ts`
- [X] T012 [P] Crear el esquema compartido del chequeo en `packages/shared/src/salud/index.ts` y exportar todo en `packages/shared/src/index.ts`

## Phase 3: User Story 1 - Interfaz profesional común (P1) 🎯 MVP

**Goal**: Sistema de diseño y plantilla de panel para los 5 roles.

**Independent Test**: Abrir `/vista-previa` en computadora y celular y cambiar entre los 5 roles.

- [X] T013 [US1] Definir tokens de color, tipografía, espacios y sombras en `apps/web/src/app/globals.css`
- [X] T014 [US1] Cargar fuentes y metadatos en español en `apps/web/src/app/layout.tsx`
- [X] T015 [P] [US1] Crear la utilidad de clases en `apps/web/src/lib/cn.ts` y el logo en `apps/web/src/components/marca/logo.tsx`
- [X] T016 [P] [US1] Crear botón, campo, selector y etiqueta en `apps/web/src/components/ui/`
- [X] T017 [P] [US1] Crear tarjeta, tabla, esqueleto y estado vacío en `apps/web/src/components/ui/`
- [X] T018 [P] [US1] Crear diálogo, pestañas y aviso en `apps/web/src/components/ui/`
- [X] T019 [P] [US1] Definir el menú de los 5 roles en `apps/web/src/config/menus.ts`
- [X] T020 [US1] Prueba de la definición de menús en `tests/pruebas-unitarias/web/menus.test.ts`
- [X] T021 [US1] Crear menú lateral contraíble y panel móvil en `apps/web/src/components/panel/menu-lateral.tsx`
- [X] T022 [US1] Crear barra superior y plantilla en `apps/web/src/components/panel/barra-superior.tsx` y `apps/web/src/components/panel/plantilla-panel.tsx`
- [X] T023 [US1] Crear la vista previa, solo en desarrollo, en `apps/web/src/app/vista-previa/page.tsx`
- [X] T024 [P] [US1] Crear la página de inicio en `apps/web/src/app/page.tsx`
- [X] T025 [P] [US1] Crear páginas de error en `apps/web/src/app/not-found.tsx` y `apps/web/src/app/error.tsx`
- [X] T026 [US1] Prueba end-to-end y de accesibilidad en `tests/pruebas-end-to-end/plantilla.spec.ts`

## Phase 4: User Story 2 - Proyecto funcionando de punta a punta (P2)

**Goal**: Front, back y `pf_control` conectados con capas limpias.

**Independent Test**: La página `/estado` muestra los tres servicios en verde.

- [X] T027 [P] [US2] Prueba de la regla del estado en `tests/pruebas-unitarias/api/estado-sistema.test.ts`
- [X] T028 [P] [US2] Prueba del caso de uso con un doble en `tests/pruebas-unitarias/api/consultar-salud.test.ts`
- [X] T029 [P] [US2] Prueba de la ruta en `tests/pruebas-unitarias/api/ruta-salud.test.ts`
- [X] T030 [US2] Implementar la regla en `apps/api/src/domain/salud/estado-sistema.ts`
- [X] T031 [US2] Crear el puerto y el caso de uso en `apps/api/src/application/puertos/verificador-base-datos.ts` y `apps/api/src/application/casos-de-uso/consultar-salud.ts`
- [X] T032 [US2] Crear el adaptador en `apps/api/src/infrastructure/base-de-datos/verificador-postgres.ts` y la lectura del entorno en `apps/api/src/infrastructure/config/entorno.ts`
- [X] T033 [US2] Crear cabeceras, errores, ruta y aplicación en `apps/api/src/interface/http/`
- [X] T034 [US2] Unir las capas en `apps/api/src/index.ts`
- [X] T035 [US2] Prueba de integración en `tests/pruebas-de-integracion/verificador-postgres.test.ts`
- [X] T036 [US2] Crear la página de estado en `apps/web/src/app/estado/page.tsx` y `apps/web/src/lib/api.ts`
- [X] T037 [US2] Prueba end-to-end de la página de estado en `tests/pruebas-end-to-end/estado.spec.ts`
- [X] T038 [US2] Actualizar instrucciones en `README.md`, `apps/api/README.md` y `packages/shared/README.md`

## Phase 5: User Story 3 - Calidad automática (P3)

**Goal**: Cada pull request se revisa solo.

**Independent Test**: Romper la regla de capas en local y comprobar que falla con el archivo indicado.

- [X] T039 [US3] Crear la regla de capas en `.dependency-cruiser.cjs`
- [X] T040 [US3] Crear el pipeline en `.github/workflows/ci.yml`
- [X] T041 [US3] Comprobar que la regla de capas falla con una importación prohibida temporal en `apps/api/src/domain/salud/estado-sistema.ts`

- [X] T044 [US1] Agregar movimiento a la portada en `apps/web/src/components/portada/` y reforzar el verde en `apps/web/src/app/globals.css`

## Phase 6: Polish

- [X] T042 Ejecutar `npm run verificar`, las pruebas y `npm run build` y corregir lo que falle
- [X] T043 Revisar visualmente cada pantalla en computadora y celular, y validar `specs/001-base-proyecto/quickstart.md`

## Dependencies

- Setup → Foundational → US1 → US2 → US3 → Polish.
- US1 y US2 no dependen entre sí, salvo que `/estado` reutiliza componentes de US1.
- En cada historia, las pruebas se escriben antes que su implementación.

## Parallel Example

```text
US1: T016, T017, T018 y T019 tocan archivos distintos.
US2: T027, T028 y T029 tocan archivos distintos.
```

## Implementation Strategy

Primero se entrega US1, que es lo visible, y se revisa en pantalla. Luego US2 conecta los servicios y US3 protege el trabajo. Cada fase termina con sus pruebas en verde.
