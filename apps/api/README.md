# apps/api: back (Cloudflare Workers)

Arquitectura limpia en cuatro capas. Regla: las dependencias solo apuntan hacia adentro.

| Carpeta | Qué va aquí | Puede usar |
|---|---|---|
| `src/domain/` | Entidades y reglas de negocio puras (reserva, evento, tarifa, venta) | nada |
| `src/application/` | Casos de uso y puertos (interfaces hacia el exterior) | `domain` |
| `src/infrastructure/` | Adaptadores: Neon, Redis, IA de Cloudflare, correo, WhatsApp, consulta de DNI, pagos | `application`, `domain` |
| `src/interface/` | Rutas HTTP, tiempo real y validación de entrada | `application` |

`src/index.ts` es el punto de entrada y el único lugar que une las capas. `npm run capas` falla si alguien rompe la regla.

Las claves locales van en `.dev.vars`, que está fuera de git. Usa `.dev.vars.example` como guía.

Las pruebas de este back viven en `tests/` (ver `tests/README.md`).
