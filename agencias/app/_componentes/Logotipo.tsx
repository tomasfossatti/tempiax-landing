/**
 * El logotipo de AutoVenta, como texto en la tipografía de los títulos: "Auto"
 * en azul y "Venta" en naranja. Es texto real, así que se lee y se indexa sin
 * texto alternativo aparte.
 */
export function Logotipo({ className = "" }: { readonly className?: string }) {
  return (
    <span
      className={`font-[family-name:var(--font-gilroy)] text-[1.7rem] leading-none font-extrabold tracking-tight ${className}`}
    >
      <span className="text-[#3873fb]">Auto</span>
      <span className="text-[#fe6700]">Venta</span>
    </span>
  );
}
