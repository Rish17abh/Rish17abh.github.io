import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const root = resolve('out');
const port = Number(process.env.PORT || 3000);
const mime = { '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.ico':'image/x-icon' };
const server = createServer(async (request,response) => {
  try {
    const url = new URL(request.url || '/', 'http://127.0.0.1');
    let file = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + sep)) {response.writeHead(403).end();return;}
    let info = await stat(file).catch(() => null);
    if (info?.isDirectory()) {
      if (!url.pathname.endsWith('/')) {response.writeHead(308,{Location:url.pathname+'/'+url.search}).end();return;}
      file = resolve(file, 'index.html');info=await stat(file).catch(() => null);
    }
    if (!info?.isFile()) { response.writeHead(404,{'Content-Type':mime['.html']});response.end(await readFile(resolve(root,'404.html')).catch(()=>Buffer.from('Not found')));return; }
    response.writeHead(200,{'Content-Type':mime[extname(file)] || 'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
    response.end(request.method === 'HEAD' ? undefined : await readFile(file));
  } catch {response.writeHead(400).end('Bad request');}
});
server.listen(port,'127.0.0.1',() => console.log(`Portfolio preview: http://127.0.0.1:${port}`));
for (const signal of ['SIGTERM','SIGINT']) process.on(signal,()=>server.close(()=>process.exit(0)));
