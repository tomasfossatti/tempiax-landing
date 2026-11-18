"use client";

import { useEffect, useState, type ReactNode } from "react";

import type { VersionDelHero } from "../contenido";

/** Cuánto queda cada versión en pantalla, en milisegundos. */
const DURACION = 5000;

/**
 * El titular y el subtítulo del hero, rotando entre las versiones cada 5
 * segundos. El botón y el microtexto llegan como `children` y no cambian.
 *
 * - Las versiones están apiladas en la misma celda de una grilla, así el bloque
 *   toma el alto de la más larga y el botón no salta al cambiar.
 * - Con el mouse encima o el foco adentro (por ejemplo en el botón) no rota,
 *   para que nadie pierda el texto que está leyendo.
 * - Sin JavaScript, o con "reducir movimiento", se ve solo la primera versión.
 */
export function HeroRotativo({
  versiones,
  children,
}: {
  readonly versiones: readonly VersionDelHero[];
  readonly children: ReactNode;
}) {
  const [indice, setIndice] = useState(0);
  const [sinMovimiento, setSinMovimiento] = useState(false);
  const [encima, setEncima] = useState(false);
  const [conFoco, setConFoco] = useState(false);

  useEffect(() => {
    setSinMovimiento(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const pausado = sinMovimiento || encima || conFoco;

  useEffect(() => {
    if (pausado) return;
    const id = setTimeout(() => setIndice((i) => (i + 1) % versiones.length), DURACION);
    return () => clearTimeout(id);
  }, [indice, pausado, versiones.length]);

  return (
    <div
      onMouseEnter={() => setEncima(true)}
      onMouseLeave={() => setEncima(false)}
      onFocus={() => setConFoco(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setConFoco(false);
      }}
    >
      <h1 className="grid text-[2.15rem] leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
        {versiones.map((v, i) => (
          <span
            key={v.id}
            aria-hidden={i !== indice}
            className={`[grid-area:1/1] transition-[opacity,translate] duration-500 ease-out motion-reduce:translate-y-0 ${
              i === indice ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
            }`}
          >
            {v.titular}
          </span>
        ))}
      </h1>

      <div className="mt-5 grid max-w-xl">
        {versiones.map((v, i) => (
          <p
            key={v.id}
            aria-hidden={i !== indice}
            className={`[grid-area:1/1] text-lg leading-relaxed text-[#33405e] transition-[opacity,translate] delay-75 duration-500 ease-out motion-reduce:translate-y-0 sm:text-xl ${
              i === indice ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
            }`}
          >
            {v.subtitulo}
          </p>
        ))}
      </div>

      <div className="mt-8 max-w-md">{children}</div>
    </div>
  );
}
