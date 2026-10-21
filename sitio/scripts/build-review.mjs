import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

// Vista de revisión: con borradores y la ayuda para medir puntos, sin indexación. La usan las
// pruebas de navegador y las vistas de Cloudflare; la compilación normal excluye los borradores.
execFileSync(process.execPath, [resolve('node_modules/astro/bin/astro.mjs'), 'build'], {
  stdio: 'inherit',
  env: { ...process.env, PUBLIC_INCLUDE_DRAFTS: 'true', PUBLIC_LAUNCH_READY: 'false' },
});
