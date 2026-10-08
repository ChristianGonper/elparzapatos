// Cierra con contraseña todo lo que publica Cloudflare Pages (producción y vistas previas)
// mientras la web no esté abierta. Se borra en el bloque 6, al publicar.
// Usuario «elpar»; la contraseña es la variable secreta SITE_PASSWORD del proyecto.
const USER = 'elpar';
const REALM = 'El Par (privado)';
const encoder = new TextEncoder();

const deny = (status, body, extra = {}) =>
  new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
      ...extra,
    },
  });

// Lee «Authorization: Basic …» y devuelve usuario y contraseña, o null si no es válida.
const credentials = (header) => {
  const match = /^Basic\s+([A-Za-z0-9+/=]+)\s*$/i.exec(header ?? '');
  if (!match) return null;
  try {
    const bytes = Uint8Array.from(atob(match[1]), (char) => char.charCodeAt(0));
    const text = new TextDecoder().decode(bytes);
    const colon = text.indexOf(':');
    return colon < 0 ? null : { user: text.slice(0, colon), password: text.slice(colon + 1) };
  } catch {
    return null;
  }
};

// Compara en tiempo constante: resume ambos valores con SHA-256 (misma longitud) y recorre
// todos los bytes sin salir antes.
const same = async (a, b) => {
  const [x, y] = await Promise.all(
    [a, b].map(
      async (value) => new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value))),
    ),
  );
  let difference = 0;
  for (let i = 0; i < x.length; i++) difference |= x[i] ^ y[i];
  return difference === 0;
};

export async function onRequest(context) {
  const expected = context.env.SITE_PASSWORD;
  // Falla cerrado: sin contraseña configurada no se sirve nada.
  if (typeof expected !== 'string' || expected === '')
    return deny(503, 'Acceso privado sin configurar.');
  const given = credentials(context.request.headers.get('Authorization'));
  const userOk = await same(given?.user ?? '', USER);
  const passwordOk = await same(given?.password ?? '', expected);
  if (!given || !userOk || !passwordOk)
    return deny(401, 'Acceso privado.', {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
    });
  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', 'noindex');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
