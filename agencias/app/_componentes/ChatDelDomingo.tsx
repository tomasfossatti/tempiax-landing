"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Car, Check, CheckCheck, Mic, SendHorizontal } from "lucide-react";

/**
 * La imagen del hero mientras no exista el video: el "¿sigue disponible?" del
 * domingo a las 22:04 y la respuesta del asistente en el mismo minuto, con las
 * fotos de la unidad y la pregunta por el usado.
 *
 * Está animada como una conversación de verdad: el cliente escribe en la barra
 * de abajo y manda, la agencia aparece "escribiendo…" y responde en tandas.
 * Al terminar espera unos segundos y vuelve a empezar. Con "reducir movimiento"
 * se muestra la conversación entera, quieta.
 *
 * `fotos` son las rutas de las fotos de la unidad que existen en `public/`.
 * Si no hay, se muestran marcos con el ícono del auto.
 */

const PREGUNTA_DEL_CLIENTE = "Hola, ¿sigue disponible el Corolla?";
const HORA = "22:04";

/** Cuántos mensajes hay en la conversación completa. */
const TOTAL = 4;

type Estado = {
  /** Letras ya tecleadas en la barra del cliente. */
  tecleado: number;
  /** Mensajes ya enviados: 1 cliente, 2 respuesta, 3 fotos, 4 pregunta. */
  visibles: number;
  escribiendo: boolean;
  leido: boolean;
  desvanecido: boolean;
};

const INICIAL: Estado = { tecleado: 0, visibles: 0, escribiendo: false, leido: false, desvanecido: false };
const COMPLETO: Estado = { tecleado: 0, visibles: TOTAL, escribiendo: false, leido: true, desvanecido: false };

export function ChatDelDomingo({ fotos }: { readonly fotos: readonly string[] }) {
  const [e, setE] = useState<Estado>(INICIAL);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setE(COMPLETO);
      return;
    }

    let cortado = false;
    const espera = (ms: number) =>
      new Promise<void>((resolver, rechazar) =>
        setTimeout(() => (cortado ? rechazar(new Error("cortado")) : resolver()), ms),
      );
    const cambiar = (parcial: Partial<Estado>) => setE((previo) => ({ ...previo, ...parcial }));

    const ciclo = async () => {
      for (;;) {
        setE(INICIAL);
        await espera(700);
        for (let i = 1; i <= PREGUNTA_DEL_CLIENTE.length; i++) {
          cambiar({ tecleado: i });
          const letra = PREGUNTA_DEL_CLIENTE[i - 1];
          await espera(letra === " " ? 110 : letra === "," || letra === "¿" ? 160 : 55);
        }
        await espera(400);
        cambiar({ tecleado: 0, visibles: 1 });
        await espera(900);
        cambiar({ leido: true });
        await espera(350);
        cambiar({ escribiendo: true });
        await espera(1700);
        cambiar({ escribiendo: false, visibles: 2 });
        await espera(700);
        cambiar({ visibles: 3 });
        await espera(1100);
        cambiar({ escribiendo: true });
        await espera(1400);
        cambiar({ escribiendo: false, visibles: 4 });
        await espera(6500);
        cambiar({ desvanecido: true });
        await espera(600);
      }
    };
    ciclo().catch(() => {});

    return () => {
      cortado = true;
    };
  }, []);

  const textoTecleado = PREGUNTA_DEL_CLIENTE.slice(0, e.tecleado);

  return (
    <figure
      className="relative mx-auto w-full max-w-[360px]"
      aria-label="Ejemplo de conversación: un domingo a las 22:04 alguien pregunta si sigue disponible el Corolla y el asistente responde a las 22:04 con fotos de la unidad y pregunta por el usado."
    >
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[48px] bg-[radial-gradient(60%_60%_at_70%_30%,rgba(56,115,251,0.22),transparent_70%),radial-gradient(50%_50%_at_20%_90%,rgba(254,103,0,0.16),transparent_70%)]"
      />
      <div
        aria-hidden
        className="overflow-hidden rounded-[32px] border-[6px] border-[#0b1733] bg-[#0b1733] shadow-[0_30px_60px_-30px_rgba(11,23,51,0.55)]"
      >
        {/* Encabezado del chat, visto desde el celular del cliente */}
        <div className="flex items-center gap-3 bg-[#0f2147] px-4 py-3 text-white">
          <span className="grid size-9 place-items-center rounded-full bg-[#3873fb]">
            <Car className="size-5" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-bold">Tu agencia</p>
            <p className={`text-xs transition-colors ${e.escribiendo ? "text-[#7fe3a1]" : "text-[#a9bde6]"}`}>
              {e.escribiendo ? "escribiendo…" : "en línea"}
            </p>
          </div>
        </div>

        {/* Mensajes: el alto es fijo para que el hero no salte mientras llegan */}
        <div
          className={`flex h-[412px] flex-col justify-end gap-2.5 overflow-hidden bg-[#eaf2fb] px-3 py-4 text-[13.5px] leading-snug text-[#0b1733] transition-opacity duration-500 ${
            e.desvanecido ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="mx-auto mb-auto w-fit rounded-md bg-white/80 px-2 py-0.5 text-[11px] font-bold tracking-wide text-[#4a5672] uppercase">
            Domingo
          </p>

          {e.visibles >= 1 && (
            <div className="burbuja ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[#d4f5d0] px-3 py-2 shadow-sm">
              <p>{PREGUNTA_DEL_CLIENTE}</p>
              <p className="mt-1 flex items-center justify-end gap-1 text-[11px] text-[#4a5672]">
                {HORA}
                {e.leido ? (
                  <CheckCheck className="size-3.5 text-[#3873fb]" />
                ) : (
                  <Check className="size-3.5 text-[#7a849b]" />
                )}
              </p>
            </div>
          )}

          {e.visibles >= 2 && (
            <div className="burbuja max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
              <p>
                ¡Hola! Sí, sigue disponible: Corolla XEi 2019, automático, 68.000 km. Te mando fotos
                de la unidad.
              </p>
              <p className="mt-1 text-right text-[11px] text-[#4a5672]">{HORA}</p>
            </div>
          )}

          {e.visibles >= 3 && (
            <div className="burbuja max-w-[88%] rounded-2xl rounded-tl-sm bg-white p-1 shadow-sm">
              <div className="grid grid-cols-3 gap-1">
                {(fotos.length > 0 ? fotos.slice(0, 3) : [null, null, null]).map((src, i) => (
                  <span
                    key={src ?? i}
                    className="foto relative block aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-[#c9d9f5] to-[#9fb9ea]"
                    style={{ animationDelay: `${i * 160}ms` }}
                  >
                    {src ? (
                      <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                    ) : (
                      <span className="grid size-full place-items-center">
                        <Car className="size-5 text-[#0f2147]/70" />
                      </span>
                    )}
                  </span>
                ))}
              </div>
              <p className="px-2 pt-0.5 pb-0.5 text-right text-[11px] text-[#4a5672]">{HORA}</p>
            </div>
          )}

          {e.visibles >= 4 && (
            <div className="burbuja max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
              <p>¿Tenés un usado para entregar o pensás financiar una parte?</p>
              <p className="mt-1 text-right text-[11px] text-[#4a5672]">{HORA}</p>
            </div>
          )}

          {e.escribiendo && (
            <div className="burbuja flex w-fit items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="punto size-1.5 rounded-full bg-[#7a849b]"
                  style={{ animationDelay: `${i * 160}ms` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Barra para escribir del cliente */}
        <div className="flex items-center gap-2 bg-[#eaf2fb] px-2 pb-2">
          <div className="flex min-h-10 min-w-0 flex-1 items-center rounded-full bg-white px-4 text-[13.5px] text-[#0b1733] shadow-sm">
            {e.tecleado > 0 ? (
              <span className="truncate">
                {textoTecleado}
                <span className="cursor ml-px inline-block h-4 w-px translate-y-0.5 bg-[#1f56e0]" />
              </span>
            ) : (
              <span className="text-[#8a93a8]">Mensaje</span>
            )}
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#3873fb] text-white">
            {e.tecleado > 0 ? <SendHorizontal className="size-4.5" /> : <Mic className="size-4.5" />}
          </span>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-[#4a5672]">
        Domingo, 22:04. Respondido en el mismo minuto.
      </figcaption>
    </figure>
  );
}
