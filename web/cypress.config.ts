import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost/",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
  },
});
