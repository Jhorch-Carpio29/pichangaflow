# Tecnologías

Qué se usa, para qué y cuánto cuesta. Los precios y cuotas son referencias de cada proveedor a octubre de 2026: **se confirman en su página oficial antes de activar algo de pago** (principio VII).

## Lenguaje y repositorio

| Herramienta | Versión | Uso |
|---|---|---|
| TypeScript | 5.x, modo estricto | Todo el código: front, back y pruebas |
| Node.js | 24 LTS o superior | Desarrollo local y CI (en producción corre el runtime de Workers) |
| npm workspaces | npm 11 | Monorepo: `apps/web`, `apps/api`, `packages/shared` |
| ESLint + dependency-cruiser | ESLint 9 | Estilo y regla de capas de la arquitectura limpia (RNF-CAL-05) |
| Wrangler | 4.x | Desarrollo local y despliegue de Workers |

## Front (`apps/web`)

| Herramienta | Versión | Uso |
|---|---|---|
| Next.js | 16.4 | Páginas y paneles de los 5 roles, render en servidor |
| React | 19.3 | Interfaz |
| OpenNext para Cloudflare (`@opennextjs/cloudflare`) | 1.x | Adapta Next.js para correr como Worker |
| Tailwind CSS | 4 | Estilos |
| shadcn/ui | — | Componentes accesibles (formularios, tablas, diálogos) |
| Recharts | 3.x | Gráficos de los dashboards |
| TanStack Query | 5.x | Datos del back con caché en el navegador |
| qrcode / ZXing | — | Generar el QR de las entradas de concierto / leer esos QR y los códigos de barras de la tienda con la cámara |

## Back (`apps/api`)

| Herramienta | Versión | Uso |
|---|---|---|
| Hono | 4.x | API REST sobre Workers |
| Zod + `@hono/zod-openapi` | Zod 4 | Validación de entradas y documento OpenAPI 3.1 |
| Drizzle ORM + Drizzle Kit | — | Consultas tipadas y migraciones SQL |
| postgres.js | 3.x | Conexión a Neon a través de Hyperdrive |
| `@upstash/redis` | — | Redis por HTTP (compatible con Workers) |
| Web Crypto (PBKDF2) | — | Hash de contraseñas sin librerías externas (RNF-SEG-02) |

## Cloudflare: borde (plan Free de la zona)

| Servicio | Uso en PichangaFlow | Costo |
|---|---|---|
| DNS + DNSSEC | `pichangaflow.online`, `*.pichangaflow.online` y `admin.` | Gratis |
| SSL/TLS | Full (strict), HSTS, certificado comodín | Gratis |
| WAF, reglas personalizadas y rate limiting | Reglas administradas gratis y límite por IP en `/api` | Gratis (con límites del plan) |
| Bot Fight Mode + bloqueo de bots de IA | Frena bots y raspadores | Gratis |
| Turnstile | Anti-bots en registro, login, recuperación y reserva | Gratis |
| Cloudflare Access | Protege `admin.pichangaflow.online` | Gratis hasta 50 usuarios |
| Cache Rules + Tiered Cache | Caché 2 (estáticos y páginas públicas) | Gratis |
| Velocidad (HTTP/3, Brotli, Early Hints) | Carga más rápida | Gratis |
| Email Routing | Recibe correo en `@pichangaflow.online` y lo reenvía | Gratis |
| Web Analytics | Visitas y Core Web Vitals sin cookies | Gratis |
| **Load Balancing** | Un balanceador con regla por ruta: front (1 origen) y back (2 orígenes) | **De pago, solo en la demo**: ≈ US$ 5/mes con 2 orígenes + ≈ US$ 5 por origen extra |

## Cloudflare: plataforma de desarrollo

| Servicio | Uso | Plan gratis (referencia) | Demo |
|---|---|---|---|
| Workers | Front y back (2 Workers) | 100,000 peticiones/día | **Workers Paid ≈ US$ 5/mes** (10 millones de peticiones incluidas); la prueba de carga supera la cuota diaria gratis |
| Durable Objects | Tiempo real: una sala WebSocket por empresa | Incluido (con límites diarios) | Incluido en Workers Paid |
| Workers KV | Caché 4: configuración, tarifas, feriados | 100,000 lecturas/día | Incluido |
| R2 | Capturas de pago, logos, fotos y copias de la BD | 10 GB y sin costo de salida | Gratis |
| Images | Redimensionar y comprimir fotos | Cuota gratis de transformaciones | Gratis |
| Queues | Correos y avisos en segundo plano | Cuota diaria gratis (verificar) | Incluido |
| Cron Triggers | Vencer separaciones, avisar pagos, cargar feriados, recordatorios | Incluido | Incluido |
| Workflows | Alta de empresa paso a paso | Incluido (con límites) | Incluido |
| Hyperdrive | Pool de conexiones a Neon (balanceo 4) | Incluido (con límite diario) | Incluido |
| Workers AI | Modelo de lenguaje y embeddings del chatbot | 10,000 neuronas/día | Por uso |
| Vectorize | Búsqueda semántica (RAG) por empresa | Cuota gratis | Gratis |
| AI Gateway | Caché, límites y registro de llamadas a la IA | Gratis | Gratis |
| Secrets + Workers Logs | Claves y registros | Incluido | Incluido |

## Datos

| Servicio | Uso | Desarrollo | Demo |
|---|---|---|---|
| Neon (PostgreSQL 17) | 1 base de control + 1 base por empresa | Plan Free: 1 primario, sin réplica | Plan de pago por uso: primario + 1 réplica de lectura (≈ US$ 0.14 por CU-hora; ejemplo: 1 CU × 40 h ≈ US$ 6) |
| Upstash Redis | Caché 5, bloqueos, sesiones revocadas, límites | Plan Free (cuota mensual de comandos) | Pago por uso ≈ US$ 0.20 cada 100,000 comandos (prueba de 10 min ≈ US$ 2–3) |

## Servicios externos

| Servicio | Uso | Costo |
|---|---|---|
| APIs de DNI y RUC (3 en cadena) | Autocompletar datos personales y de empresa (RF-EXT-01/02). Candidatas: Decolecta (antes apis.net.pe), apiperu.dev y Factiliza; se confirma la cuota y los términos de cada una | Planes gratis con cuota diaria o mensual |
| Resend (respaldo: Brevo) | Correos transaccionales | Gratis: ≈ 3,000/mes (Resend) · ≈ 300/día (Brevo) |
| Yape / Plin | Cobro por QR con captura | Gratis |
| Culqi | Cobro con tarjeta, **solo en la demo** | Comisión por cobro, aprox. 3–4 % + IGV |
| Google Maps (Embed) / OpenStreetMap | Ubicación del complejo y "Cómo llegar" | Embed gratis (la clave pide una tarjeta registrada); OpenStreetMap con Leaflet como alternativa sin tarjeta |
| Nager.Date | Feriados del Perú | Gratis |
| Open-Meteo | Clima por hora | Gratis para uso no comercial |
| Web Push | Notificaciones del navegador | Gratis |
| WhatsApp (`wa.me`) y Google Calendar (enlace) | Botones para compartir y agendar | Gratis |
| SUNAT | Boleta y factura electrónica | **Futuro**, sin configurar |

## Pruebas

| Herramienta | Prueba | Dónde |
|---|---|---|
| Vitest + `@cloudflare/vitest-pool-workers` | Unitarias del front y del back | `tests/pruebas-unitarias/` |
| Vitest + PostgreSQL y Redis reales (contenedores en CI o rama de Neon) | Integración | `tests/pruebas-de-integracion/` |
| Playwright + axe-core | End-to-end y accesibilidad | `tests/pruebas-end-to-end/` |
| k6 + Grafana Cloud | Carga (1,000–2,000 usuarios) | `tests/pruebas-de-carga/` |
| OWASP ZAP (escaneo base) | Seguridad | Manual antes de la demo |

## Equipo y operación

| Herramienta | Uso | Costo |
|---|---|---|
| GitHub + GitHub Actions | Repositorio, CI, despliegue con Wrangler y copia diaria de la BD a R2 | Gratis |
| Sentry | Errores del front y del back | Plan Developer gratis |
| UptimeRobot | Aviso si el sitio deja de responder | Gratis (chequeo cada 5 min) |
| Grafana Cloud | Métricas de la prueba de carga | Plan gratis |
| Namecheap | Dominio `pichangaflow.online`, con DNS delegado a Cloudflare | Precio de promoción el primer año; la renovación es más cara |
| Spec Kit 0.12 + Claude Code | Metodología SDD | Gratis |

## Presupuesto del mes de la demo (estimado)

| Concepto | Estimado |
|---|---|
| Workers Paid | US$ 5 |
| Load Balancing (3 orígenes) | ≈ US$ 10 |
| Neon (primario + réplica, uso de la demo) | ≈ US$ 5–15 |
| Upstash Redis (pago por uso) | ≈ US$ 2–5 |
| Culqi | Comisión por cada cobro de prueba |
| **Total** | **≈ US$ 22–35**, dentro de RNF-COS-02 (≤ US$ 40) |

Fuera de la demo todo vuelve a los planes gratis (RNF-COS-01).
