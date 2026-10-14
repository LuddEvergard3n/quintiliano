/** Servidor estático local, sem dependências, para módulos ES e Service Worker. */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const port = Number(process.env.PORT || 8080);
const types = { '.css': 'text/css', '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const file = resolve(root, pathname === '/' ? 'index.html' : `.${pathname}`);
  if (file !== root && !file.startsWith(`${root}${sep}`)) { response.writeHead(403); response.end('Forbidden'); return; }
  try {
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-cache' });
    response.end(body);
  } catch (_) {
    response.writeHead(404); response.end('Not found');
  }
}).listen(port, () => console.log(`Quintiliano em http://localhost:${port}`));
