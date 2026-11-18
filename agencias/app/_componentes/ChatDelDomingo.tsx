import { Car, CheckCheck } from "lucide-react";

/**
 * La imagen del hero mientras no exista el video: el "¿sigue disponible?" del
 * domingo a las 22:04 y la respuesta del asistente en el mismo minuto, con las
 * fotos de la unidad y la pregunta por el usado.
 *
 * Es HTML y no una imagen porque es el elemento más grande de la primera
 * pantalla (el LCP): así pinta con la primera respuesta del servidor, sin
 * esperar ningún archivo. Las "fotos" son marcos con el ícono del auto; cuando
 * llegue el póster real, lo reemplaza entero.
 */
export function ChatDelDomingo() {
  return (
    <figure
      className="relative mx-auto w-full max-w-[360px]"
      aria-label="Ejemplo de conversación: un domingo a las 22:04 alguien pregunta si sigue disponible el Corolla y el asistente responde a las 22:04 con fotos de la unidad y pregunta por el usado."
    >
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[48px] bg-[radial-gradient(60%_60%_at_70%_30%,rgba(56,115,251,0.22),transparent_70%),radial-gradient(50%_50%_at_20%_90%,rgba(254,103,0,0.16),transparent_70%)]"
      />
      <div className="overflow-hidden rounded-[32px] border-[6px] border-[#0b1733] bg-[#0b1733] shadow-[0_30px_60px_-30px_rgba(11,23,51,0.55)]">
        <div className="flex items-center gap-3 bg-[#0f2147] px-4 py-3 text-white">
          <span className="grid size-9 place-items-center rounded-full bg-[#3873fb]">
            <Car aria-hidden className="size-5" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-bold">Tu agencia</p>
            <p className="text-xs text-[#a9bde6]">en línea</p>
          </div>
        </div>

        <div className="space-y-3 bg-[#eaf2fb] px-3 py-4 text-[13.5px] leading-snug text-[#0b1733]">
          <p className="mx-auto w-fit rounded-md bg-white/80 px-2 py-0.5 text-[11px] font-bold tracking-wide text-[#4a5672] uppercase">
            Domingo
          </p>

          <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[#d4f5d0] px-3 py-2 shadow-sm">
            <p>Hola, ¿sigue disponible el Corolla?</p>
            <p className="mt-1 flex items-center justify-end gap-1 text-[11px] text-[#4a5672]">
              22:04 <CheckCheck aria-hidden className="size-3.5 text-[#3873fb]" />
            </p>
          </div>

          <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
            <div className="mb-2 grid grid-cols-3 gap-1.5" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="grid aspect-[4/3] place-items-center rounded-lg bg-gradient-to-br from-[#c9d9f5] to-[#9fb9ea]"
                >
                  <Car className="size-5 text-[#0f2147]/70" />
                </span>
              ))}
            </div>
            <p>
              ¡Hola! Sí, sigue disponible: Corolla XEi 2019, automático, 68.000 km. Te mando fotos
              de la unidad.
            </p>
            <p className="mt-1.5">¿Tenés un usado para entregar o pensás financiar una parte?</p>
            <p className="mt-1 text-right text-[11px] text-[#4a5672]">22:04</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-[#4a5672]">
        Domingo, 22:04. Respondido en el mismo minuto.
      </figcaption>
    </figure>
  );
}
