# Research: Base del proyecto

## 1 · Identidad visual

- **Decision**: Tinta azul verdosa para el menú lateral, verde cancha como color principal y neutros fríos para el contenido. Tipografía Inter para el texto y Sora para títulos y cifras. Tokens en variables CSS expuestas a Tailwind 4.
- **Rationale**: El verde conecta con el rubro y el fondo oscuro del menú da aspecto de producto empresarial. Los tokens permiten cambiar la marca o agregar tema oscuro sin tocar pantallas (FR-001).
- **Alternatives considered**: Un verde brillante en toda la interfaz, descartado porque cansa en paneles de uso diario. Una plantilla comprada, descartada porque no controla accesibilidad ni coherencia.

## 2 · Componentes

- **Decision**: Componentes propios al estilo shadcn/ui en `components/ui`, sobre Radix para diálogos, menús y pestañas.
- **Rationale**: El código queda en el repositorio y Radix resuelve teclado y lectores de pantalla (WCAG AA).
- **Alternatives considered**: MUI o Ant Design, descartados por peso y por un aspecto difícil de personalizar.

## 3 · Conexión a la base

- **Decision**: Puerto `VerificadorBaseDatos` con adaptador postgres.js. La cadena se toma de Hyperdrive si existe y, si no, de `DATABASE_URL` en `.dev.vars`.
- **Rationale**: En local no hace falta crear Hyperdrive. En despliegue se agrega sin cambiar código de negocio.
- **Alternatives considered**: Driver HTTP de Neon, descartado porque `tecnologias.md` define Hyperdrive con postgres.js.

## 4 · Front y back en local

- **Decision**: `next dev` en el puerto 3000 reenvía `/api/*` al back en el 8787.
- **Rationale**: El navegador usa la misma ruta `/api` que en producción y no aparecen problemas de CORS.
- **Alternatives considered**: Activar CORS en el back, descartado porque en producción no se necesita.

## 5 · OpenNext

- **Decision**: Se configura en la funcionalidad de despliegue, junto con el dominio.
- **Rationale**: La 001 corre en local y el usuario comprará el dominio para desplegar. CI sí ejecuta `next build`.
- **Risk**: La compatibilidad de Next 16.4 con OpenNext queda por comprobar. Debe validarse antes de las pantallas de negocio más pesadas.

## 6 · Pruebas

- **Decision**: Vitest en Node para `domain`, `application`, rutas Hono y utilidades. Integración contra PostgreSQL real, usando un contenedor en CI. Se difiere `@cloudflare/vitest-pool-workers` hasta que un módulo use KV, Durable Objects u otros servicios de Workers.
- **Rationale**: En esta base no hay nada propio de Workers que simular, y Hono funciona igual con `app.request`.
- **Alternatives considered**: Usar Neon en CI, descartado porque expone una clave y depende de la red.

## 7 · Versiones

- **Decision**: Se respetan las versiones de `tecnologias.md`: TypeScript 5, ESLint 9 y postgres.js 3, aunque ya existan versiones mayores.
- **Rationale**: Evita cambios incompatibles no evaluados. Las demás dependencias usan la versión estable vigente.
