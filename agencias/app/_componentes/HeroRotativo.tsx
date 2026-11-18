"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

import type { VersionDelHero } from "../contenido";

/** Cuánto queda cada versión en pantalla, en milisegundos. */
const DURACION = 5000;

/**
 * El titular y el subtítulo del hero, rotando entre las versiones cada 5
 * segundos. El botón y el microtexto llegan como `children` y no cambian.
 *
 * - Las versiones están apiladas en la misma celda de una grilla, así el bloque
 *   toma el alto de la más larga y el botón no salta al cambiar.
 * - El avance lo marca la barrita del indicador: cuando termina su animación
 *   pasa a la siguiente, y pausarla (mouse encima, foco adentro o el botón de
 *   pausa) frena la rotación en el mismo punto.
 * - Sin JavaScript se ve la primera versión y no aparecen los controles. Con
 *   "reducir movimiento" arranca en pausa y cambia solo a pedido.
 */
export function HeroRotativo({
  versiones,
  children,
}: {
  readonly versiones: readonly VersionDelHero[];
  readonly children: ReactNode;
}) {
  const [indice, setIndice] = useState(0);
  const [montado, setMontado] = useState(false);
  const [pausadoPorUsuario, setPausadoPorUsuario] = useState(false);
  const [encima, setEncima] = useState(false);
  const [conFoco, setConFoco] = useState(false);

  useEffect(() => {
    setMontado(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPausadoPorUsuario(true);
    }
  }, []);

  const pausado = pausadoPorUsuario || encima || conFoco;
  const siguiente = () => setIndice((i) => (i + 1) % versiones.length);

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

      {montado && (
        <div className="mt-6 flex items-center gap-3">
          <ul className="flex items-center gap-2">
            {versiones.map((v, i) => (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => setIndice(i)}
                  aria-label={`Ver mensaje: ${v.nombre}`}
                  aria-current={i === indice ? "true" : undefined}
                  className="group flex h-6 items-center rounded-full focus-visible:ring-4 focus-visible:ring-[#fe6700]/60 focus-visible:outline-hidden"
                >
                  <span className="relative block h-1.5 w-8 overflow-hidden rounded-full bg-[#cfe0f6] transition-colors group-hover:bg-[#b5cdee] sm:w-10">
                    {i === indice && (
                      <span
                        key={indice}
                        onAnimationEnd={siguiente}
                        className="absolute inset-0 origin-left rounded-full bg-[#1f56e0]"
                        style={{
                          animation: `avance-del-hero ${DURACION}ms linear forwards`,
                          animationPlayState: pausado ? "paused" : "running",
                        }}
                      />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPausadoPorUsuario((p) => !p)}
            aria-label={pausadoPorUsuario ? "Reanudar la rotación de mensajes" : "Pausar la rotación de mensajes"}
            className="flex size-7 items-center justify-center rounded-full text-[#4a5672] transition-colors hover:bg-[#e7effa] hover:text-[#1f56e0] focus-visible:ring-4 focus-visible:ring-[#fe6700]/60 focus-visible:outline-hidden"
          >
            {pausadoPorUsuario ? (
              <Play aria-hidden className="size-3.5" />
            ) : (
              <Pause aria-hidden className="size-3.5" />
            )}
          </button>
        </div>
      )}

      <div className="mt-6 max-w-md">{children}</div>
    </div>
  );
}
