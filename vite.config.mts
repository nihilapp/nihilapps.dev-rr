import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    nodePolyfills({
      include: ['buffer', 'process'],
    }),
  ],
  ssr: {
    noExternal: ['drizzle-orm', 'postgres', 'stream-browserify'],
  },
});
