# Requisitos no funcionales

Cuán rápido, seguro, disponible y barato debe ser PichangaFlow. Cada requisito tiene una meta que se puede medir y la prueba que lo comprueba. Las specs de Spec Kit los citan por su ID.

**Columna "Prueba"**

- **U**: unitaria.
- **I**: integración.
- **E2E**: end-to-end.
- **C**: carga.
- **M**: revisión manual o herramienta externa.

Las metas de tiempo usan p95: el 95 % de las peticiones debe cumplirla.

## 1 · Rendimiento (RNF-REN)

| ID | Requisito | Meta | Prueba |
|---|---|---|---|
| RNF-REN-01 | Lecturas de la API (disponibilidad, listas, detalle) | p95 ≤ 300 ms | C (k6) |
| RNF-REN-02 | Escrituras de la API (separar, subir captura, confirmar, vender) | p95 ≤ 800 ms | C (k6) |
| RNF-REN-03 | Carga de páginas en celular con 4G | LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1 | M (Lighthouse, Web Analytics) |
| RNF-REN-04 | Un cambio aparece en las pantallas de los otros roles | ≤ 1 s (p95) | E2E (dos navegadores) |
| RNF-REN-05 | Chatbot | primera palabra ≤ 3 s · respuesta completa ≤ 10 s | I |
| RNF-REN-06 | Autocompletado de DNI o RUC, contando los respaldos | ≤ 2 s; si no, se escribe a mano | I |
| RNF-REN-07 | Escanear una entrada de concierto y ver el resultado | ≤ 1 s | E2E |
| RNF-REN-08 | JavaScript inicial de las páginas públicas | ≤ 200 KB comprimido | M (build) |
| RNF-REN-09 | Escanear, buscar o digitar un producto y verlo en el carrito | ≤ 1 s | E2E |

## 2 · Carga y escalabilidad (RNF-CAR)

| ID | Requisito | Meta | Prueba |
|---|---|---|---|
| RNF-CAR-01 | Aguantar usuarios activos a la vez con la mezcla real de uso (mirar mapa, reservar, pagar, vender en la tienda) | 2,000 usuarios durante 15 min · errores < 1 % · p95 dentro de RNF-REN-01 y 02 | C (k6 + Grafana) |
| RNF-CAR-02 | Muchos clientes piden el mismo horario a la vez | 100 intentos simultáneos → exactamente 1 reserva y 99 respuestas 409 · 0 duplicadas | C, I |
| RNF-CAR-03 | Uso sostenido sin degradarse | 500 usuarios durante 1 h · el p95 no sube más de 20 % | C |
| RNF-CAR-04 | Escalar sin intervención humana | Los Workers escalan solos; las conexiones a Neon pasan por Hyperdrive y no superan el límite del plan | C |
| RNF-CAR-05 | La caché descarga a la base | ≥ 60 % de las lecturas de disponibilidad salen de caché durante la prueba · reportes leídos de la réplica | C |
| RNF-CAR-06 | Ingreso masivo a un concierto | 5 escaneos por segundo durante 10 min · una misma entrada escaneada a la vez en 2 equipos → 1 válida y 1 rechazada | C, I |
| RNF-CAR-07 | Dos cajeros venden la última unidad a la vez | 1 venta aceptada y 1 con aviso de falta de stock · el stock nunca queda negativo | I |

## 3 · Disponibilidad y respaldo (RNF-DIS)

| ID | Requisito | Meta | Prueba |
|---|---|---|---|
| RNF-DIS-01 | Disponibilidad mensual del sitio y la API | ≥ 99.5 % | M (UptimeRobot) |
| RNF-DIS-02 | Si el back principal falla, el tráfico pasa al respaldo (demo) | ≤ 2 min, sin intervención | M (apagar un origen) |
| RNF-DIS-03 | Si Redis falla, el sistema sigue funcionando más lento con la base; las reservas siguen protegidas por `EXCLUDE` | 0 errores de reserva duplicada | I |
| RNF-DIS-04 | Si fallan las APIs de DNI o el correo, la operación principal no se detiene | Entrada manual de datos · reintento del correo desde la cola | I |
| RNF-DIS-05 | Copia diaria de cada base en R2, conservada 30 días | Pérdida máxima 24 h (RPO) · recuperación ≤ 4 h (RTO) · restauración probada antes de la demo | M |
| RNF-DIS-06 | Desplegar sin cortar el servicio y poder volver atrás | Vuelta a la versión anterior ≤ 5 min | M |

## 4 · Seguridad (RNF-SEG)

| ID | Requisito | Meta | Prueba |
|---|---|---|---|
| RNF-SEG-01 | Solo HTTPS | TLS 1.2 o superior · SSL Full (strict) · HSTS | M |
| RNF-SEG-02 | Contraseñas guardadas con hash | PBKDF2-SHA256, 100,000 iteraciones (máximo de Workers), sal única · mínimo 8 caracteres con letras y números | U |
| RNF-SEG-03 | Sesiones seguras | Cookie `HttpOnly`, `Secure`, `SameSite=Lax` · personal 12 h, cliente 30 días · cierre forzado inmediato (Redis) | I |
| RNF-SEG-04 | Frenar ataques de contraseña | Bloqueo de 15 min tras 5 intentos fallidos por cuenta o IP · Turnstile en registro, inicio de sesión y recuperación | I, E2E |
| RNF-SEG-05 | Protección en el borde | WAF con reglas gratis · máx. 100 peticiones/min por IP en `/api` · Bot Fight Mode y bloqueo de bots de IA | M |
| RNF-SEG-06 | Cada endpoint valida rol y empresa | 0 accesos indebidos en la prueba automática "cada rol contra cada ruta" | I |
| RNF-SEG-07 | Entradas validadas y consultas parametrizadas · cabeceras CSP, `X-Frame-Options`, `Referrer-Policy` | 0 hallazgos altos en OWASP ZAP (escaneo base) | M |
| RNF-SEG-08 | Ningún secreto en el repositorio | Claves solo en Cloudflare Secrets · escaneo de secretos de GitHub activo | M |
| RNF-SEG-09 | Las capturas de pago no son públicas | R2 privado · enlace firmado de ≤ 10 min solo para el cajero o admin de esa empresa | I |
| RNF-SEG-10 | Auditoría que no se puede alterar | Solo inserción · guarda usuario, acción, antes y después, IP y hora · conservada ≥ 12 meses | I |
| RNF-SEG-11 | Las entradas de concierto no se pueden falsificar | Código aleatorio de al menos 128 bits · en la base solo se guarda su hash | U |

## 5 · Privacidad (RNF-PRI)

| ID | Requisito | Meta | Prueba |
|---|---|---|---|
| RNF-PRI-01 | Cumplir la Ley 29733 y su reglamento | Consentimiento explícito al registrarse · política de privacidad visible · finalidad declarada | M |
| RNF-PRI-02 | Mostrar el DNI solo a quien lo necesita | Enmascarado (`****5678`) fuera de caja y administración | E2E |
| RNF-PRI-03 | Atender la eliminación de cuenta | ≤ 30 días · los registros contables quedan anonimizados | I |
| RNF-PRI-04 | Registros sin datos sensibles | Sin contraseñas, tokens ni DNI completos en logs y Sentry | U |
| RNF-PRI-05 | El chatbot no recibe datos personales | El contexto enviado a la IA no lleva DNI, teléfonos ni datos de otros clientes | U |

## 6 · Multiempresa (RNF-MT)

| ID | Requisito | Meta | Prueba |
|---|---|---|---|
| RNF-MT-01 | Alta de empresa completa (base creada y migrada, admin invitado) | ≤ 2 min | I |
| RNF-MT-02 | Aislamiento entre empresas | 0 accesos cruzados en las pruebas de aislamiento | I, E2E |
| RNF-MT-03 | Migraciones en todas las bases de empresa | Un comando · idempotente · versión registrada por base | I |
| RNF-MT-04 | Crecer sin cambiar la arquitectura | ≥ 50 empresas | M |

## 7 · Calidad del código (RNF-CAL)

| ID | Requisito | Meta | Prueba |
|---|---|---|---|
| RNF-CAL-01 | Cobertura de pruebas | ≥ 80 % de líneas en `domain` y `application` · ≥ 60 % global | U, I |
| RNF-CAL-02 | Tipos y estilo | TypeScript estricto · 0 errores de lint y de tipos en CI | M (CI) |
| RNF-CAL-03 | Trazabilidad | Cada RF "Debe" tiene al menos una prueba de integración o end-to-end que cita su ID | M |
| RNF-CAL-04 | Pipeline rápido | CI completo ≤ 15 min | M (CI) |
| RNF-CAL-05 | La arquitectura limpia se respeta sola | Una regla automática de importaciones falla si una capa interna importa una externa | M (CI) |
| RNF-CAL-06 | API documentada | OpenAPI 3.1 generado desde el código | M |

## 8 · Usabilidad y accesibilidad (RNF-USA)

| ID | Requisito | Meta | Prueba |
|---|---|---|---|
| RNF-USA-01 | Accesible | WCAG 2.1 AA · 0 errores críticos en axe | E2E |
| RNF-USA-02 | Pensado para el celular | Funciona desde 360 px de ancho · Cliente y Garitero se usan con una mano | E2E |
| RNF-USA-03 | Reservar es rápido | ≤ 5 toques y ≤ 2 min desde la página del complejo hasta subir la captura | E2E |
| RNF-USA-04 | Formato local | Español del Perú · `S/ 1,234.50` · hora de Lima en formato de 12 h (`7:00 p. m.`) · fechas `dd/mm/aaaa` | U |
| RNF-USA-05 | Mensajes claros | Los errores dicen qué pasó y qué hacer, sin códigos técnicos | M |
| RNF-USA-06 | Dashboards legibles | Carga con esqueleto ≤ 1 s · cada gráfico con título, unidades y máximo 6 series | M |

## 9 · Compatibilidad (RNF-COM)

| ID | Requisito | Meta | Prueba |
|---|---|---|---|
| RNF-COM-01 | Navegadores | Chrome, Edge, Firefox y Safari (2 últimas versiones) · Chrome Android · Safari iOS 16+ | E2E (Playwright) |
| RNF-COM-02 | Instalable y con cámara | PWA instalable · las entradas QR y los códigos de barras se leen con la cámara del navegador, sin app · lector USB compatible | E2E |
| RNF-COM-03 | Impresión de comprobantes | Ticketera térmica de 80 mm desde el navegador | M |

## 10 · Observabilidad (RNF-OBS)

| ID | Requisito | Meta | Prueba |
|---|---|---|---|
| RNF-OBS-01 | Registros estructurados | JSON con id de petición, empresa y rol, en Workers Logs | I |
| RNF-OBS-02 | Errores vigilados | Front y back en Sentry · alerta por correo ≤ 5 min | M |
| RNF-OBS-03 | Chequeo de salud | `GET /api/salud` revisa base y Redis; lo usan el balanceador y UptimeRobot | I |
| RNF-OBS-04 | Métricas de la prueba de carga | p95, errores y usuarios activos en Grafana Cloud | C |

## 11 · Inteligencia artificial (RNF-IA)

| ID | Requisito | Meta | Prueba |
|---|---|---|---|
| RNF-IA-01 | Respuestas correctas | ≥ 90 % en un set de 50 preguntas por empresa demo · 0 precios u horarios inventados | I |
| RNF-IA-02 | Resistente a manipulación | No revela datos de otras empresas ni sus instrucciones internas ante 20 ataques de inyección conocidos | I |
| RNF-IA-03 | Gasto controlado | Desarrollo dentro de la cuota gratis diaria de Workers AI · AI Gateway con caché y límite por usuario | M |

## 12 · Costo (RNF-COS)

| ID | Requisito | Meta | Prueba |
|---|---|---|---|
| RNF-COS-01 | Desarrollo gratis | US$ 0 al mes, solo con planes gratuitos | M |
| RNF-COS-02 | Demo barata | ≤ US$ 40 en el mes de la demo (estimado en [tecnologias.md](tecnologias.md)) · recursos de pago apagados al terminar | M |
| RNF-COS-03 | Sin sorpresas | Alertas de facturación activas en Cloudflare, Neon y Upstash | M |
