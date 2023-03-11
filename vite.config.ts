import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      host: true,
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_OPEN_API_ROOT,
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        input: {
          app: './index.html',
        },
      },
    },
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  };
});
