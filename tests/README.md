# tests

Las cuatro pruebas del proyecto, todas en esta carpeta.

| Carpeta | Qué valida | Cómo |
|---|---|---|
| `pruebas-unitarias/` (`api/` y `web/`) | Reglas de negocio y componentes por separado | Sin red ni base de datos |
| `pruebas-de-integracion/` | Casos de uso del back trabajando con la base de datos y Redis | Con servicios reales |
| `pruebas-end-to-end/` | Recorridos completos de cada rol en el navegador | De la pantalla a la base de datos |
| `pruebas-de-carga/` | Que el sistema aguante 1,000 a 2,000 usuarios activos sin caerse | Simulación de usuarios simultáneos |
