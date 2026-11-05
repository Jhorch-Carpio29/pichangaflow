const capa = (nombre) => `^apps/api/src/${nombre}`;

/** Las dependencias del back solo apuntan hacia adentro (RNF-CAL-05). */
module.exports = {
  forbidden: [
    {
      name: "domain-es-puro",
      comment: "domain no conoce otras capas ni servicios externos.",
      severity: "error",
      from: { path: capa("domain") },
      to: { path: [capa("(application|infrastructure|interface)"), "node_modules/(hono|postgres|@hono)"] },
    },
    {
      name: "application-no-conoce-el-exterior",
      comment: "application solo usa domain y sus puertos.",
      severity: "error",
      from: { path: capa("application") },
      to: { path: [capa("(infrastructure|interface)"), "node_modules/(hono|postgres|@hono)"] },
    },
    {
      name: "interface-no-usa-infrastructure",
      comment: "interface llega a infrastructure solo mediante puertos.",
      severity: "error",
      from: { path: capa("interface") },
      to: { path: capa("infrastructure") },
    },
    {
      name: "infrastructure-no-usa-interface",
      severity: "error",
      from: { path: capa("infrastructure") },
      to: { path: capa("interface") },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "apps/api/tsconfig.json" },
  },
};
