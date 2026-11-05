# Feature Specification: Base del proyecto

**Feature Branch**: `001-base-proyecto`

**Created**: 2026-11-05

**Status**: Implementada

**Input**: User description: "Funcionalidad 001 Base del proyecto: monorepo con front y back ordenados con arquitectura limpia; conexión a la base de control; chequeo de salud del back; CI; y sistema de diseño profesional común a todos los roles, con plantilla de panel y menú lateral izquierdo, adaptable a celular. Solo la base: sin empresas, login ni reservas."

**Requisitos que cubre**: RNF-CAL-01, RNF-CAL-02, RNF-CAL-04, RNF-CAL-05, RNF-USA-01, RNF-USA-02, RNF-USA-04, RNF-USA-05, RNF-COM-01, RNF-REN-03, RNF-SEG-07 (cabeceras), RNF-SEG-08. Prepara el chequeo de salud que usará RNF-DIS-02. No completa ningún RF: es la base sobre la que se construyen todos.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Una interfaz profesional y común a todos los roles (Priority: P1)

Quien entra a cualquier panel de PichangaFlow encuentra el mismo aspecto cuidado: menú a la izquierda, colores y letras consistentes, y componentes que se comportan igual en todas las pantallas. El producto se ve listo para venderse desde el primer módulo.

**Why this priority**: Todas las pantallas de los módulos siguientes se construyen con esta base. Si nace bien, los 5 roles quedan coherentes sin rehacer trabajo. La interfaz también es lo primero que juzga un comprador.

**Independent Test**: Abrir la vista previa de la plantilla en computadora y en celular, cambiar entre los menús de los 5 roles y revisar que todos comparten aspecto y comportamiento.

**Acceptance Scenarios**:

1. **Given** una pantalla de computadora, **When** se abre la plantilla de panel, **Then** el menú aparece fijo a la izquierda con el logo arriba, las secciones agrupadas y la opción actual resaltada.
2. **Given** un celular de 360 px de ancho, **When** se abre la plantilla, **Then** el menú se oculta y se abre con un botón, sin desplazamiento horizontal.
3. **Given** la vista previa, **When** se elige otro de los 5 roles, **Then** cambian las opciones del menú y el aspecto sigue siendo el mismo.
4. **Given** la plantilla, **When** se usa solo con el teclado, **Then** se alcanzan todas las opciones y siempre se ve dónde está el foco.
5. **Given** un monto, una fecha o una hora, **When** se muestran, **Then** usan el formato peruano: `S/ 1,234.50`, `dd/mm/aaaa` y `7:00 p. m.`.

---

### User Story 2 - Un proyecto ordenado que funciona de punta a punta (Priority: P2)

El equipo descarga el repositorio, sigue pocos pasos y ve funcionando el front y el back, conectados entre sí y con la base de control. Cada cosa tiene un lugar claro, de modo que cualquier integrante sabe dónde escribir el código nuevo.

**Why this priority**: Sin esta conexión no se puede construir ningún módulo, pero por sí sola no da valor visible al cliente.

**Independent Test**: En un equipo limpio, seguir las instrucciones del proyecto, levantarlo y comprobar que la página de estado muestra front, back y base de datos en verde.

**Acceptance Scenarios**:

1. **Given** el repositorio recién descargado y las claves locales configuradas, **When** se siguen las instrucciones, **Then** el front y el back funcionan en el equipo en menos de 10 minutos.
2. **Given** el back funcionando y la base disponible, **When** se consulta su chequeo de salud, **Then** informa que está sano y que la base responde.
3. **Given** que la base no está disponible, **When** se consulta el chequeo de salud, **Then** informa el fallo con un estado de error, sin mostrar datos internos ni claves.
4. **Given** la página de estado en el front, **When** el back no responde, **Then** se muestra un mensaje claro que dice qué pasó y qué hacer, sin códigos técnicos.

---

### User Story 3 - Calidad revisada de forma automática (Priority: P3)

Cada cambio que el equipo sube se revisa solo: estilo, tipos, pruebas y reglas de arquitectura. Lo que rompe una regla no entra a la rama principal.

**Why this priority**: Protege el orden del código durante todo el proyecto. Puede agregarse después de tener la base funcionando.

**Independent Test**: Subir un cambio correcto y ver que pasa; subir uno que rompe la regla de capas y ver que falla con un mensaje que indica el archivo.

**Acceptance Scenarios**:

1. **Given** un pull request correcto, **When** se sube, **Then** la revisión automática termina en verde.
2. **Given** un cambio donde una capa interna importa una externa, **When** se revisa, **Then** falla e indica qué importación rompió la regla.
3. **Given** una prueba que falla, **When** se revisa, **Then** el pull request queda marcado como fallido.

### Edge Cases

- El back responde pero la base no: la página de estado muestra el back en verde y la base en rojo, no un fallo general.
- El front carga y el back está apagado: el front sigue visible y muestra el aviso, sin pantalla en blanco.
- Falta una clave local al iniciar: el back indica cuál falta, sin mostrar su valor.
- Nombres de menú largos o pantallas angostas: el texto se corta con puntos suspensivos y no rompe el diseño.
- Una ruta que no existe: se muestra una página de error con el mismo diseño y un enlace para volver.
- El usuario pide menos animación en su sistema: las animaciones se reducen.

## Requirements *(mandatory)*

### Functional Requirements

**Sistema de diseño**

- **FR-001**: El sistema MUST definir en un solo lugar la paleta de colores, la tipografía, los espacios, los bordes y las sombras, y todas las pantallas MUST tomarlos de ahí.
- **FR-002**: La paleta MUST cumplir el contraste de WCAG 2.1 AA e incluir colores de estado para éxito, aviso, error e información.
- **FR-003**: El sistema MUST ofrecer componentes base reutilizables: botones, campos de formulario, selectores, tarjetas, tablas, etiquetas de estado, diálogos, avisos, pestañas, esqueletos de carga y estados vacíos.
- **FR-004**: Cada componente interactivo MUST mostrar sus estados normal, enfocado, deshabilitado y de carga cuando apliquen.
- **FR-005**: El sistema MUST ofrecer funciones comunes para mostrar soles, fechas y horas en formato peruano y hora de Lima.

**Plantilla de panel**

- **FR-006**: La plantilla MUST tener menú lateral izquierdo con logo, grupos de opciones, íconos y opción actual resaltada, además de una barra superior con título de página y espacio para el usuario.
- **FR-007**: En computadora, el menú MUST poder contraerse a solo íconos y recordar esa preferencia en el navegador.
- **FR-008**: En celular, el menú MUST abrirse como panel deslizable y cerrarse al elegir una opción.
- **FR-009**: El menú MUST armarse desde una definición por rol, de modo que cada módulo futuro agregue sus opciones sin cambiar la plantilla.
- **FR-010**: El sistema MUST incluir una vista previa que muestre la plantilla con los menús de los 5 roles y todos los componentes base, con datos de ejemplo marcados como tales. Esta vista MUST quedar fuera de la versión de producción.
- **FR-011**: El sistema MUST incluir una página de inicio con la marca, y páginas de "no encontrado" y de error con el mismo diseño.

**Proyecto y conexión**

- **FR-020**: La portada MUST tener un fondo con movimiento y un mapa de canchas animado, y MUST detener esas animaciones si el usuario pide menos movimiento.

- **FR-012**: El repositorio MUST organizar el front, el back y el código compartido en áreas separadas, con instrucciones para levantar el proyecto.
- **FR-013**: El back MUST seguir las cuatro capas de la arquitectura limpia, con la conexión a la base detrás de un puerto.
- **FR-014**: El back MUST ofrecer un chequeo de salud público que informe su estado y el de la base de control, sin revelar datos internos.
- **FR-015**: El front MUST mostrar una página de estado con el resultado del chequeo y MUST comunicarse solo con el back.
- **FR-016**: Las claves MUST vivir fuera del repositorio; el repositorio MUST incluir solo un ejemplo sin valores reales.
- **FR-017**: El back y el front MUST enviar las cabeceras de seguridad básicas.

**Calidad automática**

- **FR-018**: Cada pull request MUST pasar de forma automática estilo, tipos, pruebas unitarias, pruebas de integración, pruebas end-to-end con revisión de accesibilidad y regla de capas.
- **FR-019**: La revisión automática MUST fallar si la cobertura queda por debajo de lo exigido en RNF-CAL-01.

### Key Entities

Esta funcionalidad no crea datos de negocio. La base de control solo se usa para comprobar la conexión.

- **Estado del sistema**: resultado del chequeo de salud, con el estado general y el de cada dependencia.
- **Definición de menú**: opciones que ve cada rol, con su nombre, ícono, grupo y destino.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: La vista previa no presenta errores críticos de accesibilidad en la revisión automática, en computadora ni en celular.
- **SC-002**: La plantilla funciona sin desplazamiento horizontal desde 360 px de ancho.
- **SC-003**: El 100 % de los colores de las pantallas sale de la definición común; ninguna pantalla usa colores sueltos.
- **SC-004**: Un integrante nuevo levanta el proyecto en menos de 10 minutos siguiendo las instrucciones.
- **SC-005**: La página de estado refleja una caída de la base en menos de 5 segundos tras recargarla.
- **SC-006**: La revisión automática completa termina en 15 minutos o menos.
- **SC-007**: La página de inicio carga su contenido principal en 2.5 segundos o menos con una conexión 4G.
- **SC-008**: Agregar una opción al menú de un rol requiere cambiar un solo archivo.

## Assumptions

- El proyecto corre en local durante esta funcionalidad; el despliegue y el dominio se configuran después.
- La conexión local usa la base `pf_control`, ya creada en Neon. El integrante guarda la cadena de conexión en su archivo local de claves.
- Sin login todavía, la vista previa cambia de rol con un selector. La funcionalidad 003 definirá el acceso real.
- Las pantallas de negocio, como reservas o tienda, no se construyen aquí: los menús apuntan a destinos de ejemplo.
- La interfaz se entrega en tema claro. El tema oscuro queda fuera de esta funcionalidad, aunque la definición común debe permitir agregarlo después.
- La marca se construye con un logo tipográfico propio hasta que el equipo tenga uno definitivo.
- La revisión automática de integración usa una base temporal propia, no la base real de Neon.
