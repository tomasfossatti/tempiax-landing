/**
 * Isotipo de AutoVenta: una A azul cuya barra es un check naranja que sale de
 * la letra (cliente calificado, reunión confirmada). La máscara deja aire entre
 * el check y las patas, así funciona sobre cualquier fondo. Es el mismo dibujo
 * que `marca/isotipo.svg` en la raíz del repo.
 */
const A = "M14 88L50 12L86 88";
const CHECK = "M30 60L43 72L80 34";

export function Isotipo({ className = "" }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden focusable="false" className={className}>
      <mask id="autoventa-iso-aire" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <rect width="100" height="100" fill="#fff" />
        <path d={CHECK} fill="none" stroke="#000" strokeWidth="23" strokeLinecap="round" strokeLinejoin="round" />
      </mask>
      <path
        d={A}
        fill="none"
        stroke="#3873fb"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
        mask="url(#autoventa-iso-aire)"
      />
      <path d={CHECK} fill="none" stroke="#fe6700" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
