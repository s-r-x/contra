import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      name: 'Contra',
      fileName: format => `contra.${format}.js`,
    },
  },
});
