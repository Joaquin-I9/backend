// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        unauthorized: resolve(__dirname, '401.html'),
        notFound: resolve(__dirname, '404.html'),
        register: resolve(__dirname, 'src/pages/register.html'),
        productos: resolve(__dirname, 'src/pages/productos.html'),
        users: resolve(__dirname, 'src/pages/users.html')
      }
    }
  }
});