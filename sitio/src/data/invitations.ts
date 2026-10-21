import type { ImageMetadata } from 'astro';
import { site } from './site';
import { reviewHours } from './participation';
import { guideImage } from './images';

// Invitaciones del final de cada página. Cada final habla de lo que se acaba de ver: la común solo
// queda en Qué es El Par; cada par, los armarios, Cómo colaborar y la guía llevan la suya. La
// portada cierra con su propia sección.
export interface InvitationContent {
  label: string;
  /** Título en dos líneas; la segunda va en cursiva. */
  title: [string, string];
  text: string;
  action: { href: string; label: string };
  note?: string;
  image?: { src: ImageMetadata; alt: string };
}

export const commonInvitation: InvitationContent = {
  label: 'El siguiente puede ser el tuyo',
  title: ['¿Nos enseñas', 'tus zapatos?'],
  text: 'Mándanos ese par que te encanta, o todos los que quieras, y te contamos todo lo que tienen.',
  action: { href: '/participa/', label: 'Manda tu par' },
};

export const wardrobeInvitation: InvitationContent = {
  label: 'Tu armario',
  title: ['¿Empezamos', 'el tuyo?'],
  text: 'Con dos pares ya tienes armario, y crece cuando a ti te apetezca. Cada par tendrá su espacio.',
  action: { href: '/participa/', label: 'Manda tus pares' },
};

export const guideInvitation: InvitationContent = {
  label: 'Siguiente paso',
  title: ['Seis fotos', 'y ya está.'],
  text: 'Las que harías para enseñarle tus zapatos a una amiga. Te enseñamos cada vista con las bailarinas de María.',
  action: { href: '/guia-de-fotos/', label: 'Qué fotos hacer' },
  image: {
    src: guideImage(2),
    alt: 'Las bailarinas de María, de perfil, como ejemplo de las fotos de la guía',
  },
};

export const sendInvitation: InvitationContent = {
  label: 'Último paso',
  title: ['Ya puedes', 'enviar tus fotos.'],
  text: 'Sube las fotos, cuéntanos qué te gusta de cada par y elige cómo apareces. Si tienes más pares, caben en el mismo envío.',
  action: { href: site.tally, label: 'Enviar mis fotos' },
  note: `Antes de publicarlo te mandamos el retrato. Tienes ${reviewHours} horas para revisarlo.`,
};

/** Invitación final de un par: la suya si la tiene y, si no, la genérica. */
export const pairInvitation = (pair: {
  feminine: boolean;
  invitation?: { title: [string, string]; text: string };
}): InvitationContent =>
  pair.invitation
    ? {
        label: pair.feminine ? '¿Y las tuyas?' : '¿Y los tuyos?',
        title: pair.invitation.title,
        text: pair.invitation.text,
        action: {
          href: '/participa/',
          label: pair.feminine ? 'Manda las tuyas' : 'Manda los tuyos',
        },
      }
    : {
        label: '¿Y los tuyos?',
        title: ['Acabas de ver todo lo que tenía este par.', '¿Qué tendrán los tuyos?'],
        text: 'Mándanos fotos y te lo contamos. Uno o todos los que quieras.',
        action: { href: '/participa/', label: 'Manda tu par' },
      };
