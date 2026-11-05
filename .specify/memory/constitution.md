<!--
Informe de sincronía
- Versión: 1.0.0 → 1.0.1 (PARCHE: se aclara la descripción del producto; los principios no cambian)
- Cambio: se agrega el alquiler de eventos por días, la tienda reemplaza al punto de venta y el QR de puerta queda solo para conciertos
- Plantillas revisadas: plan-template.md (la sección "Constitution Check" se llena con los principios I–VIII), spec-template.md y tasks-template.md (sin cambios necesarios)
- Pendientes: ninguno
-->

# Constitución de PichangaFlow

PichangaFlow es un SaaS multiempresa para complejos deportivos: reservas de canchas con mapa en vivo, alquiler de eventos por días, pagos, tienda con inventario, cochera, entradas con QR para conciertos, chatbot con IA y paneles para cada rol. Este documento manda sobre cualquier otro del proyecto.

## Principios

### I. Primero la especificación (SDD con Spec Kit)

- Ningún código se escribe sin `spec.md`, `plan.md` y `tasks.md` aprobados de su feature (`/speckit-specify` → `/speckit-clarify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`).
- Cada spec cita los requisitos que cubre (`RF-…`, `RNF-…`) de [requisitos-funcionales.md](requisitos-funcionales.md) y [requisitos-no-funcionales.md](requisitos-no-funcionales.md). Un requisito nuevo o cambiado se escribe primero en esos archivos.
- Si el código y la spec se contradicen, se corrige el código o se enmienda la spec; nunca se deja la diferencia.

### II. Cada empresa, aislada

- Una base de datos por empresa y una base de control para la plataforma ([base-de-datos.md](base-de-datos.md)).
- La empresa se resuelve **solo** por el subdominio de la petición (`empresa.pichangaflow.online`) y el back abre la conexión a la base de esa empresa. Ningún dato de una empresa se puede leer ni escribir desde otra.
- Las políticas RLS por empresa se mantienen como segunda barrera aunque la base ya esté separada. No se quitan.
- Las pruebas de integración demuestran el aislamiento en cada feature que toque datos.

### III. Arquitectura limpia

- El back (`apps/api`) tiene cuatro capas: `domain` → `application` → `infrastructure` → `interface`. Las dependencias solo apuntan hacia adentro y el dominio no conoce Cloudflare, Neon ni Redis.
- Todo servicio externo (base, caché, IA, correo, DNI, pagos) entra por un puerto de `application` con su adaptador en `infrastructure`, para poder cambiarlo o simularlo en pruebas.
- El front (`apps/web`) no accede a la base de datos ni a servicios privados: todo lo pide al back.

### IV. Las cuatro pruebas (no negociable)

- Unitarias, de integración, end-to-end y de carga, en `tests/` ([tests/README.md](../../tests/README.md)).
- Toda regla de negocio nace con su prueba unitaria; todo caso de uso que toque datos, con su prueba de integración; todo recorrido principal de un rol, con su prueba end-to-end.
- La prueba de carga con k6 debe pasar con 2,000 usuarios activos y cero reservas duplicadas antes de la demo (RNF-CAR-01 y RNF-CAR-02).
- Ninguna prueba se desactiva y ningún umbral de cobertura se baja para que pase el pipeline.

### V. Reservas y dinero sin errores

- Nunca dos reservas cruzadas en la misma cancha: bloqueo en Redis (`SET NX`) y restricción `EXCLUDE USING gist` en PostgreSQL. Esta última es la verdad final.
- Los montos se guardan en céntimos (enteros) y en soles (PEN). Nunca con decimales flotantes.
- El precio final, la reserva confirmada y el estado de un pago se leen siempre de la base principal, nunca de una caché.
- Cada operación de dinero (pago, venta, devolución, cierre de caja) queda en la auditoría con usuario, fecha y hora de Lima. Las confirmaciones son idempotentes: repetir el clic no duplica nada.

### VI. Seguridad y privacidad por defecto

- Cada rol ve y hace solo lo suyo (mínimo privilegio). Toda ruta del back valida rol y empresa.
- Contraseñas con hash PBKDF2-SHA256 (Web Crypto); sesiones en cookies `HttpOnly`, `Secure` y `SameSite`.
- Claves y tokens solo en Cloudflare Secrets o `.dev.vars` local; nunca en el repositorio.
- Datos personales (DNI, nombre, teléfono) tratados según la Ley 29733 de Protección de Datos Personales del Perú: consentimiento al registrarse, solo lo necesario y derecho a pedir su eliminación.

### VII. Gasto mínimo y simplicidad

- Se usa lo gratuito siempre que alcance. Solo se paga durante la demo y la prueba de carga: balanceador, réplica de Neon, Workers de pago, Redis por uso y Culqi.
- Todo recurso de pago se documenta con su costo estimado en [tecnologias.md](tecnologias.md) antes de activarse, y se apaga al terminar la demo.
- Se prefiere el servicio de Cloudflare que ya existe antes que agregar otro proveedor. Nada se construye "por si acaso".

### VIII. Paneles claros, sincronizados y en español

- La interfaz y la documentación van en español del Perú: soles (S/), hora de Lima (`America/Lima`) y fechas `dd/mm/aaaa`.
- Un cambio hecho por un rol se ve en las pantallas de los demás roles en menos de 1 segundo (tiempo real).
- Diseño pensado primero para el celular, accesible (WCAG 2.1 AA) y con paneles de datos fáciles de leer.

## Restricciones técnicas

- Todo se despliega en Cloudflare: el front y el back como Workers separados, con tiempo real en Durable Objects. La base va en Neon (PostgreSQL) y la caché compartida en Upstash Redis. El detalle está en [arquitectura.md](arquitectura.md) y [tecnologias.md](tecnologias.md).
- Next.js 16 trae cambios incompatibles con versiones anteriores (por ejemplo, el middleware ahora es `proxy.ts`). Antes de escribir código de Next se lee la guía en `apps/web/node_modules/next/dist/docs/`.
- El código debe respetar los límites de Workers: sin sistema de archivos, sin procesos largos (lo lento va a Queues o Workflows) y solo APIs web estándar.
- Desplegar, crear o borrar recursos de pago y configurar Cloudflare, Neon o el dominio son tareas **manuales** del equipo. Las herramientas automáticas no las hacen sin permiso explícito.

## Flujo de trabajo y calidad

- Una rama por feature con el nombre que da Spec Kit (`001-nombre`). Se integra a `main` por pull request.
- Commits convencionales que citan la tarea y el requisito, por ejemplo `feat(001): crear empresa (T012, RF-AG-01)`.
- Un pull request entra solo si GitHub Actions pasa: lint, tipos, pruebas unitarias y de integración, cobertura de al menos 80 % en `domain` y `application`, y end-to-end de los recorridos afectados.
- Cada `/speckit-plan` llena su "Constitution Check" con los principios I–VIII. Una violación se justifica en el plan o el plan no avanza.

## Documentos de referencia

| Archivo | Contenido |
|---|---|
| [requisitos-funcionales.md](requisitos-funcionales.md) | Qué hace el sistema, por módulo y por rol |
| [requisitos-no-funcionales.md](requisitos-no-funcionales.md) | Cuán rápido, seguro y disponible debe ser, con metas medibles |
| [arquitectura.md](arquitectura.md) | Cómo funciona por dentro, con diagramas y decisiones |
| [tecnologias.md](tecnologias.md) | Herramientas, versiones, planes y costos |
| [base-de-datos.md](base-de-datos.md) | Bases, entidades y reglas de datos (sin código) |

## Gobierno

- Esta constitución está por encima de cualquier otra práctica del proyecto. Las specs, planes, tareas y el código deben cumplirla.
- Se enmienda solo con `/speckit-constitution`, dejando el motivo en el informe de sincronía del inicio y subiendo la versión: MAYOR si se quita o redefine un principio, MENOR si se agrega uno o una sección, PARCHE si solo se aclara la redacción.
- En cada revisión de pull request se verifica que se cumplan los principios. Una complejidad extra solo entra si se justifica en el plan.

**Versión**: 1.0.1 | **Ratificada**: 2026-10-24 | **Última enmienda**: 2026-11-04
