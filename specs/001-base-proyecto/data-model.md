# Data Model: Base del proyecto

Esta funcionalidad no crea tablas. Los modelos solo existen en código.

## Estado del sistema

| Campo | Tipo | Regla |
|---|---|---|
| `estado` | `sano` · `degradado` | `degradado` si alguna dependencia falla |
| `dependencias.baseDeDatos` | `disponible` · `no_disponible` | Resultado de `SELECT 1` con tiempo límite de 3 s |
| `fecha` | Texto ISO 8601 | Momento del chequeo |

## Definición de menú

| Campo | Tipo | Regla |
|---|---|---|
| `rol` | `admin-global` · `admin-empresa` · `cajero` · `garitero` · `cliente` | Los 5 roles de `requisitos-funcionales.md` |
| `grupos[].titulo` | Texto | Nombre visible del grupo |
| `grupos[].opciones[].nombre` | Texto | Nombre visible de la opción |
| `grupos[].opciones[].icono` | Ícono | Uno por opción |
| `grupos[].opciones[].destino` | Texto | Ruta de la pantalla |
