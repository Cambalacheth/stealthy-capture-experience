
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { ViteDevServer } from "vite";
import type { IncomingMessage } from "http";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add historyApiFallback to handle client-side routing properly
    middlewareMode: true,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Custom plugin to handle history API fallback for SPA
    {
      name: 'spa-fallback',
      configureServer(server: ViteDevServer) {
        server.middlewares.use((req: IncomingMessage, res: any, next: Function) => {
          if (req.url && !req.url.includes('.') && !req.url.startsWith('/api')) {
            req.url = '/';
          }
          next();
        });
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add historyApiFallback for production build
  preview: {
    port: 8080,
    host: true,
  },
}));
