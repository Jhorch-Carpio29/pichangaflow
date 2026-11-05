import { defineConfig, devices } from "@playwright/test";

const puerto = Number(process.env.PUERTO_E2E ?? 3100);

export default defineConfig({
  testDir: "tests/pruebas-end-to-end",
  fullyParallel: true,
  workers: 2,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: `http://localhost:${puerto}`, trace: "on-first-retry" },
  projects: [
    { name: "computadora", use: { ...devices["Desktop Chrome"] } },
    { name: "celular", use: { ...devices["Pixel 7"], viewport: { width: 360, height: 740 } } },
  ],
  webServer: {
    command: `npm run dev -w @pichangaflow/web -- --port ${puerto}`,
    url: `http://localhost:${puerto}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
