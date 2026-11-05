import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["apps/api/src/**/*.ts", "packages/shared/src/**/*.ts", "apps/web/src/config/**/*.ts"],
      exclude: ["apps/api/src/index.ts", "apps/api/src/infrastructure/**"],
      thresholds: {
        lines: 60,
        "apps/api/src/domain/**": { lines: 80 },
        "apps/api/src/application/**": { lines: 80 },
      },
    },
    projects: [
      {
        test: {
          name: "unitarias",
          environment: "node",
          include: ["tests/pruebas-unitarias/**/*.test.ts"],
        },
      },
      {
        test: {
          name: "integracion",
          environment: "node",
          include: ["tests/pruebas-de-integracion/**/*.test.ts"],
        },
      },
    ],
  },
});
