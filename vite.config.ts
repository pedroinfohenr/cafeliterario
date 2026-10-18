import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function imageUploadPlugin(): Plugin {
  return {
    name: 'image-upload-handler',
    configureServer(server) {
      server.middlewares.use('/api/upload-image', (req, res) => {
        if (req.method === 'POST') {
          const rawFilename = req.headers['x-filename'];
          const filename = rawFilename 
            ? decodeURIComponent(rawFilename as string) 
            : `image_${Date.now()}.png`;

          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);
              let fileBuffer = buffer;
              const str = buffer.toString('utf-8');
              if (str.startsWith('data:image/')) {
                const base64Data = str.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
                fileBuffer = Buffer.from(base64Data, 'base64');
              }

              const targetSrc = path.resolve(__dirname, 'src/imagens', filename);
              const targetPub = path.resolve(__dirname, 'public/imagens', filename);
              fs.mkdirSync(path.dirname(targetSrc), { recursive: true });
              fs.mkdirSync(path.dirname(targetPub), { recursive: true });
              fs.writeFileSync(targetSrc, fileBuffer);
              fs.writeFileSync(targetPub, fileBuffer);

              if (filename === 'hero.png') {
                fs.writeFileSync(path.resolve(__dirname, 'public', filename), fileBuffer);
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, filename, path: `/imagens/${filename}` }));
            } catch (err: unknown) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
            }
          });
          return;
        }
        res.statusCode = 405;
        res.end('Method Not Allowed');
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), imageUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
