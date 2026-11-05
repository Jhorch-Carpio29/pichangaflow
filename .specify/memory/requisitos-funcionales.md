# Requisitos funcionales

Qué hace PichangaFlow, separado por módulos y ordenado por rol: primero el Admin Global, luego el Admin de empresa, el Cajero, el Garitero y el Cliente; al final los módulos que usan todos. Cada spec de Spec Kit cita los ID de esta lista.

**Prioridad**

- **Debe**: entra en la demo.
- **Debería**: se hace si da el tiempo.
- **Podría**: queda para después.

**Roles**

- **AG**: Admin Global.
- **AE**: Admin de empresa.
- **CJ**: Cajero.
- **GA**: Garitero.
- **CL**: Cliente.
- **SIS**: el sistema, de forma automática.

## Roles

| Rol | Quién es | Dónde entra | Quién lo crea |
|---|---|---|---|
| Admin Global | Dueño de la plataforma | `admin.pichangaflow.online` (con Cloudflare Access) | Se crea en la instalación |
| Admin de empresa | Dueño o gerente de un complejo | `empresa.pichangaflow.online/panel` | El Admin Global, al crear la empresa |
| Cajero | Atiende la caja y verifica pagos | `empresa.pichangaflow.online/panel` | El Admin de empresa |
| Garitero | Controla la cochera y las entradas de los conciertos | `empresa.pichangaflow.online/panel`, desde el celular | El Admin de empresa |
| Cliente | Jugador que reserva | `pichangaflow.online` o el subdominio del complejo | Él mismo; una sola cuenta sirve para todos los complejos |

## Módulos y quién los usa

| # | Módulo | ID | AG | AE | CJ | GA | CL |
|---|---|---|:-:|:-:|:-:|:-:|:-:|
| M1 | Empresas y plataforma | RF-AG | ● | | | | |
| M2 | Configuración del complejo | RF-CFG | | ● | | | |
| M3 | Dashboard y reportes | RF-REP | ○ | ● | | | |
| M4 | Alquiler de eventos | RF-EVE | | ● | ○ | ○ | ● |
| M5 | Caja y reservas en mostrador | RF-CAJ | | ○ | ● | | |
| M6 | Tienda e inventario | RF-POS | | ● | ● | | |
| M7 | Entradas de concierto y cochera | RF-GAR | | ○ | | ● | |
| M8 | Búsqueda y reserva | RF-RES | | ○ | ○ | | ● |
| M9 | Pagos | RF-PAG | | ○ | ○ | | ● |
| M10 | Cuenta del cliente | RF-CLI | | | | | ● |
| M11 | Acceso y cuentas | RF-ACC | ● | ● | ● | ● | ● |
| M12 | Tiempo real y notificaciones | RF-NOT | ● | ● | ● | ● | ● |
| M13 | Chatbot con IA | RF-IA | ○ | ○ | | | ● |
| M14 | Servicios externos | RF-EXT | ○ | ● | ● | ○ | ● |

● usa el módulo de forma principal · ○ lo consulta o lo usa en parte

---

## M1 · Empresas y plataforma (Admin Global)

**Pantallas**: Panel global · Empresas · Planes y suscripciones · Auditoría global · Base de conocimiento del chatbot.

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-AG-01 | Crear una empresa con nombre, RUC (autocompletado, RF-EXT-02), subdominio, plan y correo del Admin de empresa. El alta crea y prepara su base de datos y envía la invitación al admin. | AG | Debe |
| RF-AG-02 | Validar que el subdominio sea único, en minúsculas, de 3 a 30 caracteres y no reservado (`www`, `admin`, `api`, `app`). | AG | Debe |
| RF-AG-03 | Editar los datos, el logo y los colores de marca de una empresa. | AG | Debe |
| RF-AG-04 | Suspender y reactivar una empresa. Suspendida, muestra un aviso y no acepta reservas ni ventas, pero conserva sus datos. | AG | Debe |
| RF-AG-05 | Reenviar la invitación o restablecer el acceso del Admin de empresa. | AG | Debe |
| RF-AG-06 | Mostrar el panel global: empresas activas, reservas y ventas por empresa (día y mes), uso del chatbot y errores recientes. | AG | Debe |
| RF-AG-07 | Consultar la auditoría global: altas, suspensiones, cambios de plan y accesos del Admin Global. | AG | Debe |
| RF-AG-08 | Gestionar planes (precio mensual, máximo de canchas y de personal, módulos incluidos) y asignarlos a cada empresa. | AG | Debería |
| RF-AG-09 | Registrar a mano los pagos de suscripción, ver vencimientos y avisar al Admin de empresa 7 días antes. | AG, SIS | Debería |
| RF-AG-10 | Administrar la base de conocimiento general del chatbot (preguntas frecuentes de la plataforma). | AG | Debería |
| RF-AG-11 | Eliminar una empresa a pedido, con exportación previa de sus datos y doble confirmación. | AG | Podría |

## M2 · Configuración del complejo (Admin de empresa)

**Pantallas**: Mi complejo · Canchas y plano · Horarios y tarifas · Feriados y bloqueos · Personal · Políticas · Medios de pago · Cochera · Chatbot.

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-CFG-01 | Editar el perfil público: nombre, dirección con ubicación en el mapa, fotos, teléfono y WhatsApp, horario de atención y servicios (cochera, vestuarios, cafetería). | AE | Debe |
| RF-CFG-02 | Crear, editar y desactivar canchas con nombre, deporte, superficie, si es techada, capacidad, fotos y estado (activa o en mantenimiento). | AE | Debe |
| RF-CFG-03 | Ubicar las canchas en el plano del complejo arrastrándolas. Ese plano es el mapa en vivo que ven todos (RF-RES-02). | AE | Debe |
| RF-CFG-04 | Definir el horario de operación por día de la semana y la duración del turno (60 o 90 minutos). | AE | Debe |
| RF-CFG-05 | Definir tarifas por cancha, día de la semana y franja horaria, con precio especial en feriados. | AE | Debe |
| RF-CFG-06 | Cargar solos los feriados del Perú (RF-EXT-03) y permitir agregar fechas propias de cierre. | AE, SIS | Debe |
| RF-CFG-07 | Bloquear horarios por mantenimiento o cierre puntual. Un horario bloqueado no se puede reservar. Los alquileres por días van en M4. | AE | Debe |
| RF-CFG-08 | Crear, editar y desactivar personal (Cajero o Garitero) con DNI autocompletado (RF-EXT-01). El sistema les envía una invitación por correo para crear su contraseña. | AE | Debe |
| RF-CFG-09 | Configurar las políticas: tiempo de separación (5 min por defecto), aviso por pago sin verificar (30 min), anticipación mínima y máxima para reservar, plazo de cancelación con devolución y, para eventos, adelanto y plazo para pagarlo. | AE | Debe |
| RF-CFG-10 | Configurar los medios de pago: imagen del QR de Yape o Plin, número y titular. En la demo, activar Culqi. | AE | Debe |
| RF-CFG-11 | Configurar la cochera: número de espacios, tarifa por hora y horas gratis con reserva. | AE | Debería |
| RF-CFG-12 | Cargar la información del complejo para el chatbot: texto libre y preguntas frecuentes. | AE | Debería |
| RF-CFG-13 | Crear promociones y códigos de descuento con porcentaje o monto, vigencia y usos máximos. | AE | Podría |

## M3 · Dashboard y reportes (Admin de empresa)

**Pantallas**: Dashboard · Reportes · Cierres de caja · Clientes · Auditoría.

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-REP-01 | Mostrar el dashboard en vivo: ocupación de hoy por cancha, ingresos del día (reservas, ventas y cochera), pagos por verificar, stock bajo, próximos eventos y personal en turno. | AE | Debe |
| RF-REP-02 | Graficar ingresos por día, semana y mes; ocupación por franja horaria (mapa de calor); canchas más reservadas y productos más vendidos. | AE | Debe |
| RF-REP-03 | Filtrar los reportes por fechas, cancha, medio de pago y personal. | AE | Debe |
| RF-REP-04 | Exportar cada reporte a CSV y a una vista lista para imprimir o guardar como PDF. | AE | Debe |
| RF-REP-05 | Listar los cierres de caja de cada cajero con lo esperado, lo contado y la diferencia. | AE | Debe |
| RF-REP-06 | Consultar la auditoría de la empresa: quién confirmó, rechazó, anuló o cambió precios, y cuándo. | AE | Debe |
| RF-REP-07 | Listar clientes frecuentes con número de reservas, gasto total, última visita e inasistencias. | AE | Debería |

## M4 · Alquiler de eventos (Admin de empresa)

Alquiler de canchas o de todo el complejo por uno o varios días completos. Es distinto de la reserva por turnos de M8.

**Pantallas**: Calendario de eventos · Solicitudes · Detalle del evento · Entradas (solo conciertos). El cliente tiene Solicitar evento y Mis eventos.

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-EVE-01 | Ofrecer el alquiler de canchas o de todo el complejo por uno o varios días, según el tipo de evento: campeonato, concierto, evento corporativo, celebración u otro. | AE, CL | Debe |
| RF-EVE-02 | Recibir solicitudes del cliente con tipo de evento, fechas, canchas o complejo completo, asistentes estimados y datos de contacto. | CL | Debe |
| RF-EVE-03 | Registrar un evento directamente desde el panel, para acuerdos hechos en persona o por teléfono. | AE | Debe |
| RF-EVE-04 | Calcular el total con la tarifa por día de cada cancha o del complejo. El admin puede ajustarlo indicando el motivo. | AE | Debe |
| RF-EVE-05 | Mostrar las reservas que chocan con las fechas pedidas. El evento no se aprueba hasta que el admin las reprograme o cancele. | AE | Debe |
| RF-EVE-06 | Aprobar o rechazar la solicitud con motivo. Al aprobar, esos días quedan apartados y se avisa al cliente. | AE | Debe |
| RF-EVE-07 | Registrar el adelanto y el saldo en efectivo, Yape o Plin. Con el adelanto pagado, el evento pasa a CONFIRMADO. | CJ, AE | Debe |
| RF-EVE-08 | Cancelar el evento si el adelanto no se paga dentro del plazo, y liberar sus días. | SIS | Debe |
| RF-EVE-09 | Mostrar los días del evento en el mapa y el calendario con el color de evento (morado). Esos días no se pueden reservar. | SIS | Debe |
| RF-EVE-10 | Cancelar un evento según la política, registrando la devolución si corresponde, y liberar sus días. | AE | Debe |
| RF-EVE-11 | Mostrar al cliente en "Mis eventos" el estado, las fechas, lo pagado y el saldo. | CL | Debe |
| RF-EVE-12 | **Solo para conciertos**: generar entradas con QR único por tipo (por ejemplo, General y VIP) hasta el aforo definido, y entregarlas al organizador en un archivo para descargar. Ningún otro tipo de evento genera QR. | AE | Debe |
| RF-EVE-13 | **Solo para conciertos**: mostrar el aforo en vivo, con entradas generadas, usadas y disponibles. | AE, GA | Debe |
| RF-EVE-14 | **Solo para conciertos**: anular una entrada perdida o duplicada. Una entrada anulada se rechaza en la puerta. | AE | Debe |
| RF-EVE-15 | Vender entradas de concierto en línea. | CL | Podría |

## M5 · Caja y reservas en mostrador (Cajero)

**Pantallas**: Agenda del día (mapa) · Pagos por verificar · Nueva reserva · Turno de caja · Movimientos.

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-CAJ-01 | Abrir un turno de caja con el monto inicial. Sin turno abierto, el cajero no puede cobrar. | CJ | Debe |
| RF-CAJ-02 | Listar en vivo los pagos por verificar con la captura ampliable, el monto esperado, el cliente y el tiempo transcurrido. | CJ | Debe |
| RF-CAJ-03 | Confirmar un pago (la reserva pasa a PAGADO) o rechazarlo con motivo (pasa a CANCELADO). En ambos casos se avisa al cliente. | CJ | Debe |
| RF-CAJ-04 | Crear reservas en mostrador: buscar al cliente por DNI, elegir cancha y hora en el mapa y cobrar en efectivo, Yape o Plin. La reserva queda PAGADO. | CJ | Debe |
| RF-CAJ-05 | Reprogramar o cancelar una reserva según la política, registrando la devolución si corresponde. | CJ, AE | Debe |
| RF-CAJ-06 | Emitir un comprobante interno (no SUNAT) para imprimir o enviar por correo o WhatsApp, con DNI o RUC autocompletado. | CJ | Debe |
| RF-CAJ-07 | Cerrar el turno: el sistema calcula lo esperado por medio de pago, el cajero ingresa lo contado y queda registrada la diferencia. | CJ | Debe |
| RF-CAJ-08 | Registrar ingresos y egresos de caja con motivo (por ejemplo, compra de hielo). | CJ | Debería |
| RF-CAJ-09 | Marcar la inasistencia de una reserva pagada cuando pasan 15 minutos del inicio y el cliente no se presenta. | CJ, GA | Debería |
| RF-CAJ-10 | Aceptar un adelanto (por ejemplo, 50 %) y cobrar el saldo en caja. | CJ | Podría |

## M6 · Tienda e inventario (Cajero y Admin de empresa)

Venta de lo que se ofrece en un grass sintético: gaseosas, aguas, bebidas rehidratantes, cervezas, galletas, snacks y similares. Es una opción propia del panel y solo la usa el personal de caja: el cliente no compra productos en línea.

**Pantallas**: Tienda (carrito del cajero) · Productos · Inventario (Admin de empresa).

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-POS-01 | Registrar, editar y desactivar productos con nombre, categoría, código único (de barras o interno), precio de venta, costo, foto, stock inicial y stock mínimo. | AE | Debe |
| RF-POS-02 | Ofrecer la opción "Tienda" con carrito de compras: agregar productos, cambiar cantidades, quitar productos y ver el total antes de cobrar. | CJ | Debe |
| RF-POS-03 | Agregar productos al carrito de tres formas: escaneando el código de barras (cámara o lector USB), buscando por nombre o digitando el código. | CJ | Debe |
| RF-POS-04 | Cobrar el carrito dentro del turno de caja en efectivo (con cálculo del vuelto), Yape o Plin. Cada venta descuenta el stock y puede emitir comprobante (RF-CAJ-06). | CJ | Debe |
| RF-POS-05 | Impedir vender más unidades que el stock disponible, con un aviso claro al cajero. | SIS | Debe |
| RF-POS-06 | Mostrar al admin el stock de todos los productos con cantidad, stock mínimo, agotados y valor del inventario, con filtro por categoría. | AE | Debe |
| RF-POS-07 | Registrar entradas de mercadería y ajustes con motivo, y mostrar el historial de movimientos de cada producto. | AE | Debe |
| RF-POS-08 | Avisar del stock bajo en el dashboard del admin y en la pantalla del cajero. | SIS | Debe |
| RF-POS-09 | Anular una venta solo con permiso del admin: devuelve el stock y queda en la auditoría. | AE | Debe |
| RF-POS-10 | Subir productos en lote desde un archivo CSV. | AE | Debería |
| RF-POS-11 | Hacer un conteo físico: el admin ingresa lo contado y el sistema registra la diferencia como ajuste. | AE | Debería |
| RF-POS-12 | Asociar una venta a una reserva o a un cliente (por DNI). | CJ | Debería |
| RF-POS-13 | Alquilar implementos (pelotas, chalecos) y registrar su devolución. | CJ | Podría |

## M7 · Entradas de concierto y cochera (Garitero)

El escaneo de QR en la puerta existe **solo para conciertos**. Las reservas de cancha y los demás eventos no usan QR.

**Pantallas**: Escáner de entradas (solo con concierto activo) · Reservas de hoy · Cochera.

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-GAR-01 | Escanear la entrada del concierto con la cámara y mostrar en grande: **válida** (concierto y tipo de entrada) o **rechazada** con motivo (otro evento, otra fecha, ya usada o anulada). | GA | Debe |
| RF-GAR-02 | Marcar la entrada como usada. Una entrada sirve una sola vez, aunque dos gariteros la escaneen a la vez. | GA | Debe |
| RF-GAR-03 | Validar la entrada digitando su código cuando el QR no se puede leer. | GA | Debe |
| RF-GAR-04 | Listar las reservas de hoy con su estado en vivo y buscarlas por DNI o nombre, sin escaneo. | GA | Debe |
| RF-GAR-05 | Registrar el ingreso de un vehículo (placa y tipo) a la cochera y mostrar los espacios libres. | GA | Debería |
| RF-GAR-06 | Registrar la salida del vehículo: calcula tiempo y monto (o gratis con reserva) y registra el cobro. | GA | Debería |
| RF-GAR-07 | Seguir escaneando entradas sin internet: guarda los ingresos y los envía al volver la conexión. | GA | Podría |

## M8 · Búsqueda y reserva (Cliente)

**Pantallas**: Portal de complejos · Página del complejo · Mapa de canchas · Mis reservas.

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-RES-01 | Mostrar en `pichangaflow.online` los complejos activos en un mapa, con filtro por distrito y deporte. | CL | Debería |
| RF-RES-02 | Mostrar el mapa del complejo con cada cancha y su estado para la fecha y hora elegidas: libre (verde), en proceso (amarillo), reservada (rojo), evento (morado) y bloqueada (gris). Se actualiza en vivo. | CL, CJ, AE | Debe |
| RF-RES-03 | Mostrar el calendario de disponibilidad por cancha y día con el precio de cada turno. | CL | Debe |
| RF-RES-04 | Separar un turno: queda en HOLD solo para ese cliente durante el tiempo de separación. Si otro lo está separando, se muestra un mensaje claro. | CL | Debe |
| RF-RES-05 | Cancelar o reprogramar desde "Mis reservas" dentro del plazo de la política. | CL | Debe |
| RF-RES-06 | Mostrar en "Mis reservas" el estado y los botones "Agregar a Google Calendar", "Compartir por WhatsApp" y "Cómo llegar". | CL | Debe |
| RF-RES-07 | Reservar varios turnos seguidos en la misma cancha (por ejemplo, 2 horas). | CL | Debería |
| RF-RES-08 | Mostrar el pronóstico del clima para la fecha y hora en canchas no techadas (RF-EXT-04). | CL | Debería |
| RF-RES-09 | Reservar el mismo turno cada semana durante varias semanas. | CL | Podría |
| RF-RES-10 | Anotarse en lista de espera y recibir aviso si el horario se libera. | CL | Podría |
| RF-RES-11 | Calificar el complejo después de jugar (1 a 5 estrellas y comentario). | CL | Podría |

## M9 · Pagos (Cliente)

**Pantallas**: Pagar reserva · Estado del pago.

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-PAG-01 | Mostrar el QR de Yape o Plin del complejo, el monto exacto y el tiempo que queda de separación. | CL | Debe |
| RF-PAG-02 | Recibir la captura (JPG, PNG o WebP de hasta 5 MB) y el número de operación opcional. La reserva pasa a PENDIENTE y se libera el bloqueo de Redis. | CL | Debe |
| RF-PAG-03 | Pasar la reserva a EXPIRADO y liberar el horario si no se sube la captura dentro del tiempo de separación. | SIS | Debe |
| RF-PAG-04 | Avisar al cajero y al admin cuando un pago lleva 30 minutos sin verificar. La reserva sigue PENDIENTE hasta que el cajero decida. | SIS | Debe |
| RF-PAG-05 | Cobrar con tarjeta mediante Culqi (solo en la demo). Al aprobarse el cobro, la reserva pasa directo a PAGADO. | CL | Debe |
| RF-PAG-06 | Enviar por correo la confirmación de la reserva y el comprobante interno cuando el pago se confirma. | SIS | Debe |
| RF-PAG-07 | Registrar devoluciones según la política (manual por Yape o Plin, o por Culqi en la demo). | CJ, AE | Debería |

## M10 · Cuenta del cliente (Cliente)

**Pantallas**: Mi perfil · Historial · Privacidad.

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-CLI-01 | Editar el perfil: nombre, DNI (autocompletado), celular y correo. | CL | Debe |
| RF-CLI-02 | Mostrar el historial de reservas y pagos de todos los complejos con una sola cuenta. | CL | Debe |
| RF-CLI-03 | Descargar sus datos y pedir la eliminación de su cuenta (Ley 29733). | CL | Debe |
| RF-CLI-04 | Guardar complejos favoritos. | CL | Podría |

## M11 · Acceso y cuentas (todos los roles)

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-ACC-01 | Registrar clientes con correo y contraseña, aceptación de términos y del tratamiento de datos, y Turnstile. La cuenta debe confirmarse por correo antes de reservar. | CL | Debe |
| RF-ACC-02 | Iniciar sesión con correo y contraseña. El personal entra por el subdominio de su empresa y solo ve esa empresa. | Todos | Debe |
| RF-ACC-03 | Recuperar la contraseña con un enlace de un solo uso que vence en 30 minutos. | Todos | Debe |
| RF-ACC-04 | Cerrar sesión y cerrar todas las sesiones abiertas. El admin puede cerrar las sesiones de su personal al instante. | Todos | Debe |
| RF-ACC-05 | Mostrar solo los menús y acciones que corresponden al rol. | Todos | Debe |
| RF-ACC-06 | Servir el panel del Admin Global solo en `admin.pichangaflow.online`, protegido además por Cloudflare Access. | AG | Debe |
| RF-ACC-07 | Iniciar sesión con Google. | CL | Podría |

## M12 · Tiempo real y notificaciones (todos los roles)

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-NOT-01 | Publicar cada cambio de estado de una reserva o cancha a todos los usuarios conectados de esa empresa (ver "Sincronía entre roles"). | SIS | Debe |
| RF-NOT-02 | Reconectar solo el mapa y las listas cuando se pierde la conexión, recargando el estado actual. | SIS | Debe |
| RF-NOT-03 | Mostrar un centro de notificaciones (campana) en el panel de cada rol. | Todos | Debe |
| RF-NOT-04 | Enviar correos de confirmación de cuenta, invitación de personal, reserva confirmada, pago rechazado, cancelación y cambios de estado de un evento. | SIS | Debe |
| RF-NOT-05 | Mostrar botones de WhatsApp (`wa.me`) con el mensaje ya escrito: del cliente al complejo y del cajero al cliente. | CL, CJ | Debe |
| RF-NOT-06 | Enviar notificaciones push del navegador (si el usuario acepta): pago confirmado, recordatorio y pago por verificar. | SIS | Debería |
| RF-NOT-07 | Enviar un recordatorio por correo 2 horas antes del turno. | SIS | Debería |

## M13 · Chatbot con IA (Cliente y Admin de empresa)

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-IA-01 | Responder en la página del complejo sobre horarios, precios, ubicación, servicios y políticas usando solo los datos de esa empresa. | CL | Debe |
| RF-IA-02 | Consultar la disponibilidad real ("¿hay cancha mañana a las 8?") y ofrecer el enlace para reservar. | CL | Debe |
| RF-IA-03 | Si no sabe la respuesta, decirlo y ofrecer el WhatsApp del complejo. Nunca inventar precios ni horarios. | CL | Debe |
| RF-IA-04 | Responder en español, avisar que es una IA y limitar a 30 mensajes por usuario al día. | CL | Debe |
| RF-IA-05 | Responder preguntas del admin sobre sus propios datos ("¿cuánto vendí la semana pasada?"), solo con lectura. | AE | Podría |

## M14 · Servicios externos (varios roles)

| ID | El sistema debe… | Rol | Prioridad |
|---|---|---|---|
| RF-EXT-01 | Autocompletar el nombre al escribir un DNI de 8 dígitos, consultando hasta 3 APIs gratuitas en cadena. Si todas fallan, se escribe a mano. | AE, CJ, GA, CL | Debe |
| RF-EXT-02 | Autocompletar razón social y dirección al escribir un RUC de 11 dígitos, con la misma cadena de APIs. | AG, CJ | Debe |
| RF-EXT-03 | Cargar cada año los feriados nacionales del Perú desde Nager.Date. | SIS | Debe |
| RF-EXT-04 | Mostrar el clima por hora para la ubicación del complejo (Open-Meteo). | CL | Debería |
| RF-EXT-05 | Mostrar la ubicación en un mapa con el botón "Cómo llegar" (Google Maps u OpenStreetMap). | CL | Debe |
| RF-EXT-06 | Emitir boletas y facturas electrónicas ante SUNAT. | — | Futuro, fuera de alcance |

---

## Estados de una reserva

| Estado | Significa | Pasa a | Por |
|---|---|---|---|
| HOLD | El cliente separó el horario y aún no paga | PENDIENTE · PAGADO · EXPIRADO | Sube la captura (RF-PAG-02) · Culqi aprueba (RF-PAG-05) · vence la separación (RF-PAG-03) |
| PENDIENTE | Subió la captura y espera verificación | PAGADO · CANCELADO | El cajero confirma o rechaza (RF-CAJ-03) |
| PAGADO | Pago confirmado; el turno es del cliente | CANCELADO | Se cancela según la política (RF-CAJ-05, RF-RES-05) |
| EXPIRADO | Venció sin captura; el horario se libera | — | Final |
| CANCELADO | Rechazado o cancelado; el horario se libera | — | Final |

Las reservas hechas en mostrador (RF-CAJ-04) nacen directamente en PAGADO. El flujo completo está en [diagramas/flujo-reserva-pago.svg](diagramas/flujo-reserva-pago.svg).

## Estados de un evento

| Estado | Significa | Pasa a | Por |
|---|---|---|---|
| SOLICITADO | El cliente pidió el alquiler | APROBADO · RECHAZADO | El admin decide (RF-EVE-06) |
| APROBADO | Días apartados, a la espera del adelanto | CONFIRMADO · CANCELADO | Se paga el adelanto (RF-EVE-07) · vence el plazo (RF-EVE-08) |
| CONFIRMADO | Adelanto pagado; el evento se hará | FINALIZADO · CANCELADO | Pasa el último día · se cancela según la política (RF-EVE-10) |
| FINALIZADO | El evento ya ocurrió | — | Final |
| RECHAZADO | El admin no lo aceptó | — | Final |
| CANCELADO | Sus días se liberan | — | Final |

Los eventos registrados desde el panel (RF-EVE-03) nacen en APROBADO. El flujo completo está en [diagramas/flujo-evento-concierto.svg](diagramas/flujo-evento-concierto.svg).

## Sincronía entre roles

Todo evento llega por tiempo real (RF-NOT-01) a las pantallas indicadas en menos de 1 segundo (RNF-REN-04).

| Evento | Lo provoca | Lo ve al instante | Requisitos |
|---|---|---|---|
| Horario separado | Cliente | Todos: la casilla se pone amarilla en el mapa | RF-RES-04, RF-RES-02 |
| Captura subida | Cliente | Cajero: nuevo pago por verificar · Admin: contador del dashboard | RF-PAG-02, RF-CAJ-02, RF-REP-01 |
| Pago confirmado | Cajero o Culqi | Cliente: reserva confirmada · Todos: casilla roja · Garitero: lista de hoy · Admin: ingresos | RF-CAJ-03, RF-PAG-05, RF-GAR-04 |
| Pago rechazado | Cajero | Cliente: aviso con motivo · Todos: casilla verde | RF-CAJ-03 |
| Separación vencida | Sistema | Todos: casilla verde | RF-PAG-03 |
| Reserva en mostrador | Cajero | Todos: casilla roja · Garitero y Admin | RF-CAJ-04 |
| Solicitud de evento | Cliente | Admin: nueva solicitud en su panel | RF-EVE-02 |
| Evento aprobado | Admin de empresa | Cliente: aviso · Todos: días en morado | RF-EVE-06, RF-EVE-09 |
| Adelanto pagado | Cajero o Admin | Cliente: evento confirmado · Admin: ingresos | RF-EVE-07, RF-EVE-11 |
| Entrada de concierto escaneada | Garitero | Admin y otros gariteros: aforo en vivo | RF-GAR-02, RF-EVE-13 |
| Venta en la tienda | Cajero | Admin: ingresos y stock · otros cajeros: stock actualizado · alerta de stock bajo | RF-POS-04, RF-POS-08 |
| Entrada de mercadería | Admin de empresa | Cajero: stock actualizado en la tienda | RF-POS-07 |
| Horario bloqueado o tarifa cambiada | Admin de empresa | Cliente y Cajero: mapa y precios actualizados | RF-CFG-05, RF-CFG-07 |
| Personal desactivado | Admin de empresa | Esa persona: su sesión se cierra | RF-CFG-08, RF-ACC-04 |
| Empresa suspendida | Admin Global | Todos los de esa empresa: aviso y bloqueo de operaciones | RF-AG-04 |
