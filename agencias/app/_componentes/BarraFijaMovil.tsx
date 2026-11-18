"use client";

import { useEffect, useState } from "react";

/**
 * El botón fijo al pie en el celular, desde la sección del problema hasta el
 * llamado final. Aparece cuando el inicio de `#problema` cruzó la mitad de la
 * pantalla y se va cuando `#demo` entra en vista, porque ahí ya está el mismo
 * botón y dos juntos estorban.
 *
 * Arranca oculto: si el script no corre, la página sigue entera y cada sección
 * tiene su propio botón.
 */
export function BarraFijaMovil({
  href,
  texto,
  externo,
}: {
  readonly href: string;
  readonly texto: string;
  readonly externo: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const inicio = document.getElementById("problema");
    const fin = document.getElementById("demo");
    if (!inicio || !fin) return;

    let pendiente = false;
    const medir = () => {
      pendiente = false;
      const alto = window.innerHeight;
      const empezo = inicio.getBoundingClientRect().top < alto * 0.5;
      const llego = fin.getBoundingClientRect().top < alto;
      setVisible(empezo && !llego);
    };
    const alMover = () => {
      if (pendiente) return;
      pendiente = true;
      window.requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    return () => {
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
    };
  }, []);

  return (
    <div
      data-visible={visible}
      aria-hidden={!visible}
      className="fixed inset-x-0 bottom-0 z-40 translate-y-full border-t border-[#d6e4f5] bg-white/95 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)] backdrop-blur transition-transform duration-200 data-[visible=true]:translate-y-0 motion-reduce:transition-none md:hidden"
    >
      <a
        href={href}
        tabIndex={visible ? 0 : -1}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1f56e0] px-5 text-center text-base font-bold text-white shadow-[0_8px_20px_-8px_rgba(31,86,224,0.6)] active:bg-[#1846bd]"
      >
        {texto}
      </a>
    </div>
  );
}
