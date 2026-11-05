# Contrato: chequeo de salud

`GET /api/salud` · público · sin caché (`Cache-Control: no-store`)

| Código | Cuándo |
|---|---|
| 200 | El back y la base responden |
| 503 | La base no responde |

```json
{
  "estado": "sano",
  "dependencias": { "baseDeDatos": "disponible" },
  "fecha": "2026-11-05T15:00:00.000Z"
}
```

Con la base caída, `estado` es `degradado` y `baseDeDatos` es `no_disponible`. La respuesta nunca incluye la cadena de conexión, el servidor ni el texto del error.

`GET /api/openapi.json` publica este contrato en OpenAPI 3.1 (RNF-CAL-06).
