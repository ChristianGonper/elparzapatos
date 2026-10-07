import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

// Solo para revisión local. La compilación normal excluye los borradores.
execFileSync(process.execPath, [resolve('node_modules/astro/bin/astro.mjs'), 'build'], {
  stdio: 'inherit',
  env: { ...process.env, PUBLIC_INCLUDE_DRAFTS: 'true', PUBLIC_LAUNCH_READY: 'false' },
});
