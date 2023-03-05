import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        app: "./index.html",
      },
    },
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
});
