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
export const instagramReady = import.meta.env.PUBLIC_INSTAGRAM_READY === 'true';
export const siteUrl = import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '');
