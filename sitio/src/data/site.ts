export const site = {
  name: 'El Par',
  descriptor: 'Zapatos en detalle',
  motto: 'Vuelve a mirar tus zapatos.',
  tally: 'https://tally.so/r/Npj2bl',
  email: 'elparzapatos@proton.me',
  presentation:
    '¿Qué hace que un zapato te llame la atención? En El Par te lo enseñamos con fotos de nuestras colaboradoras. Señalamos cada detalle que suele pasar desapercibido y te contamos su nombre. Empezarás a mirar los tuyos de otra manera.',
};
export const launchReady = import.meta.env.PUBLIC_LAUNCH_READY === 'true';
export const includeDrafts =
  import.meta.env.DEV || import.meta.env.PUBLIC_INCLUDE_DRAFTS === 'true';
if (launchReady && includeDrafts) {
  throw new Error('La publicación no puede incluir borradores. Desactiva PUBLIC_INCLUDE_DRAFTS.');
}
export const instagramReady = import.meta.env.PUBLIC_INSTAGRAM_READY === 'true';
export const siteUrl = import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '');
