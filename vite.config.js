import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

function apiDevPlugin() {
  return {
    name: 'api-dev-plugin',
    configureServer(server) {
      // Load environment variables into process.env for Node server environment
      const env = loadEnv('development', process.cwd(), '');
      Object.assign(process.env, env);

      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          const apiName = req.url.split('?')[0].replace('/api/', '');
          try {
            const apiModule = await server.ssrLoadModule(`./api/${apiName}.js`);
            const handler = apiModule.default;

            if (typeof handler === 'function') {
              let bodyStr = '';
              req.on('data', chunk => { bodyStr += chunk; });
              req.on('end', async () => {
                try {
                  req.body = bodyStr ? JSON.parse(bodyStr) : {};
                } catch {
                  req.body = {};
                }

                // Add Express/Vercel style response helper methods
                res.status = (code) => {
                  res.statusCode = code;
                  return res;
                };
                res.json = (data) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return res;
                };

                try {
                  await handler(req, res);
                } catch (err) {
                  console.error(`[API Dev Server] Error in /api/${apiName}:`, err);
                  if (!res.headersSent) {
                    res.status(500).json({ error: err.message || 'Internal server error' });
                  }
                }
              });
              return;
            }
          } catch (err) {
            console.error(`[API Dev Server] Failed to load /api/${apiName}.js:`, err);
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    apiDevPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
