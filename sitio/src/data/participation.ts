// Condiciones de participación que se repiten en la web. Se cambian solo aquí.

/** Horas que tiene la colaboradora para revisar su página antes de que se publique. */
export const reviewHours = 48;
/** Horas máximas para retirar una publicación cuando se pide. */
export const removalHours = 48;

/** Crédito público de una colaboración anónima: «Colaboradora 07». */
export const anonymousCredit = (number: number) =>
  `Colaboradora ${String(number).padStart(2, '0')}`;

/** Ejemplo que se muestra en los textos que explican el anonimato. */
export const anonymousCreditExample = anonymousCredit(7);
