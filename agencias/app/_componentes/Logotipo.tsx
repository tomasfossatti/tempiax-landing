import { Isotipo } from "./Isotipo";

/**
 * El logotipo de AutoVenta: el isotipo y el nombre como texto en la tipografía
 * de los títulos, "Auto" en azul y "Venta" en naranja. El nombre es texto real,
 * así que se lee y se indexa sin texto alternativo aparte.
 */
export function Logotipo({ className = "" }: { readonly className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Isotipo className="size-8 shrink-0" />
      <span className="font-[family-name:var(--font-gilroy)] text-[1.7rem] leading-none font-extrabold tracking-tight">
        <span className="text-[#3873fb]">Auto</span>
        <span className="text-[#fe6700]">Venta</span>
      </span>
    </span>
  );
}
