# PichangaFlow

SaaS multi-tenant para complejos deportivos, desarrollado con Spec Kit (SDD) para el curso de Arquitectura de Software.

```text
.specify/    Spec Kit: reglas, requisitos, tecnologías, base de datos y arquitectura
.claude/     Skills de Spec Kit para Claude Code
apps/web     Front (Next.js en Cloudflare)
apps/api     Back (Cloudflare Workers, arquitectura limpia)
packages/    Código compartido
db/          Migraciones y datos de ejemplo
tests/       Las 4 pruebas: unitarias, de integración, end-to-end y de carga
infra/       Configuración de Cloudflare, Neon y Redis
specs/       Especificación, plan y tareas de cada funcionalidad
```

## Empezar

Necesitas Node.js 24 o superior.

1. Instala las dependencias: `npm install`
2. Copia `apps/api/.dev.vars.example` como `apps/api/.dev.vars` y pega la cadena de conexión de `pf_control`.
3. Levanta el front y el back: `npm run dev`
4. Abre `http://localhost:3000/estado`: los tres servicios deben estar operativos.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el front y el back |
| `npm run verificar` | Revisa estilo, tipos y regla de capas |
| `npm run test:unit` | Pruebas unitarias con cobertura |
| `npm run test:integracion` | Pruebas de integración; necesita `TEST_DATABASE_URL` |
| `npm run test:e2e` | Pruebas end-to-end y de accesibilidad |
| `npm run build` | Compila el front |
