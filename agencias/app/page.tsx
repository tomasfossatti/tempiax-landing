import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Bell,
  CalendarCheck,
  ChartColumn,
  Check,
  ChevronDown,
  Clock,
  Inbox,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  UserRound,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { BarraFijaMovil } from "./_componentes/BarraFijaMovil";
import { ChatDelDomingo } from "./_componentes/ChatDelDomingo";
import { Logotipo } from "./_componentes/Logotipo";
import {
  BENEFICIOS,
  COMO_FUNCIONA,
  CREDIBILIDAD,
  CTA,
  GARANTIA,
  HERO,
  LLAMADO_FINAL,
  NOMBRE_DEL_PRODUCTO,
  OFERTA,
  PENDIENTES,
  PREGUNTAS,
  PROBLEMA,
  PRUEBA_SOCIAL,
  SOLUCION,
  preguntasPublicables,
  textoDelPrecio,
} from "./contenido";

/**
 * Landing de venta para agencias de autos.
 *
 * Es un sitio estático: no lee sesión ni banco, porque quien llega desde un
 * anuncio no tiene cuenta y la página no depende de nada que pueda fallar. El copy y los pendientes viven en
 * `./contenido.ts`; acá solo está el armado.
 */

const ENLACE = PENDIENTES.enlaceDeLaDemo ?? "#demo";
const EXTERNO = /^https?:\/\//.test(ENLACE);

export const metadata: Metadata = {
  title: { absolute: `${NOMBRE_DEL_PRODUCTO} para agencias de autos` },
  description: HERO.subtitulo,
  // Sin destino para el botón principal la página no está lista para que la
  // encuentren: se puede mostrar, pero no indexar.
  robots: PENDIENTES.enlaceDeLaDemo ? undefined : { index: false, follow: false },
  openGraph: {
    title: HERO.titular,
    description: HERO.subtitulo,
    type: "website",
    locale: "es_AR",
  },
};

const ICONOS_DE_BENEFICIOS = [
  MessageCircle,
  Wallet,
  Users,
  CalendarCheck,
  RefreshCw,
  ChartColumn,
  Bell,
  ShieldCheck,
] as const;

export default function LandingAgenciasPage() {
  const preguntas = preguntasPublicables(PREGUNTAS.items);
  const hayPruebaSocial = PENDIENTES.testimonios.length > 0;
  const { medios, pie } = PENDIENTES;

  return (
    <div className="min-h-dvh bg-[#f2fcfe] text-[#0b1733] [color-scheme:light]">
      {/* ── Navegación: logo y botón, sin otros enlaces ─────────────────── */}
      <header className="border-b border-[#dbe8f6] bg-[#f2fcfe]/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logotipo />
          {/* En el celular el botón del hero ya está a la vista y después aparece la barra fija. */}
          <div className="hidden sm:block">
            <BotonDemo tamano="chico" />
          </div>
        </div>
      </header>

      <main>
        {/* ── 1. Hero ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-16 lg:pb-24">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#cfe0f6] bg-white px-3 py-1 text-sm font-bold text-[#1f56e0]">
                <span aria-hidden className="size-2 rounded-full bg-[#fe6700]" />
                Para agencias de autos
              </p>
              <h1 className="text-[2.15rem] leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
                {HERO.titular}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#33405e] sm:text-xl">
                {HERO.subtitulo}
              </p>
              <div className="mt-8 max-w-md">
                <BotonDemo />
                <Microtexto />
              </div>
            </div>

            <div>
              {medios.heroVideo ? (
                <video
                  className="mx-auto aspect-[9/16] w-full max-w-[360px] rounded-[28px] bg-[#0b1733] object-cover"
                  src={medios.heroVideo}
                  poster={medios.heroPoster ?? undefined}
                  controls
                  playsInline
                  preload="none"
                  width={360}
                  height={640}
                />
              ) : (
                <ChatDelDomingo />
              )}
            </div>
          </div>
        </section>

        {/* ── 2. Franja de credibilidad ────────────────────────────────── */}
        <section aria-label="Datos de confianza" className="border-y border-[#dbe8f6] bg-white">
          <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
            {PENDIENTES.logos.length > 0 && (
              <ul className="mb-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70 grayscale">
                {PENDIENTES.logos.map((logo) => (
                  <li key={logo.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- logos de terceros, livianos y de tamaño fijo */}
                    <img src={logo.src} alt={logo.alt} className="h-8 w-auto" loading="lazy" />
                  </li>
                ))}
              </ul>
            )}
            <ul className="flex flex-col items-center gap-2 text-center text-sm font-bold text-[#4a5672] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3">
              {[
                ...CREDIBILIDAD,
                ...(PENDIENTES.cifraDeTrayectoria ? [PENDIENTES.cifraDeTrayectoria] : []),
              ].map((dato, i) => (
                <li key={dato} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden className="hidden text-[#9fb0cc] sm:inline">
                      ·
                    </span>
                  )}
                  {dato}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 3. Problema: de noche ────────────────────────────────────── */}
        <section
          id="problema"
          aria-labelledby="problema-titulo"
          className="scroll-mt-4 bg-[#081226] text-white"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
            <div>
              <h2
                id="problema-titulo"
                className="text-3xl leading-tight text-balance sm:text-[2.6rem]"
              >
                {PROBLEMA.encabezado}
              </h2>
              <p className="mt-4 text-xl font-bold text-[#ffb27a] sm:text-2xl">
                {PROBLEMA.subtitulo}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#c3cfe6]">
                {PROBLEMA.cuerpo}
              </p>
            </div>

            {medios.capturaDelProblema ? (
              // eslint-disable-next-line @next/next/no-img-element -- captura real, anonimizada, cargada diferida
              <img
                src={medios.capturaDelProblema}
                alt="Captura de un chat real: la consulta entró el domingo a las 22:04 y la primera respuesta llegó el lunes a las 10:12."
                className="mx-auto w-full max-w-sm rounded-2xl"
                loading="lazy"
              />
            ) : (
              <RelojDelProblema />
            )}
          </div>
        </section>

        {/* ── 4. Solución ──────────────────────────────────────────────── */}
        <Seccion id="solucion" titulo={SOLUCION.encabezado} subtitulo={SOLUCION.subtitulo}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-5 text-lg leading-relaxed text-[#33405e]">
              {SOLUCION.cuerpo.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {medios.videoSolucion ? (
              <Video
                src={medios.videoSolucion}
                titulo="Qué hace el asistente y qué queda en manos del vendedor"
              />
            ) : (
              <RecorridoDeLaConsulta />
            )}
          </div>
        </Seccion>

        {/* ── 5. Cómo funciona ─────────────────────────────────────────── */}
        <Seccion
          id="como-funciona"
          titulo={COMO_FUNCIONA.encabezado}
          subtitulo={COMO_FUNCIONA.subtitulo}
          fondo="bg-white"
        >
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            <ol className="relative space-y-8 border-l-2 border-[#d6e4f5] pl-8 sm:pl-10">
              {COMO_FUNCIONA.pasos.map((paso, i) => (
                <li key={paso.titulo} className="relative">
                  <span
                    aria-hidden
                    className="absolute top-0 -left-[49px] grid size-8 place-items-center rounded-full bg-[#1f56e0] text-sm font-bold text-white ring-4 ring-white sm:-left-[57px]"
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-xl">{paso.titulo}</h3>
                  <p className="mt-2 leading-relaxed text-[#33405e]">{paso.texto}</p>
                </li>
              ))}
            </ol>

            <div className="space-y-6">
              <div className="rounded-2xl bg-[#081226] p-6 text-white">
                <p className="text-sm font-bold tracking-wider text-[#a9bde6] uppercase">
                  Los hitos
                </p>
                <ul className="mt-4 space-y-5">
                  {COMO_FUNCIONA.hitos.map((hito) => (
                    <li key={hito.dia} className="flex gap-4">
                      <span className="w-16 shrink-0 font-[family-name:var(--font-gilroy)] text-xl text-[#ffb27a]">
                        {hito.dia}
                      </span>
                      <span className="leading-snug text-[#dbe5f6]">{hito.texto}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {COMO_FUNCIONA.objeciones.map((o) => (
                <div
                  key={o.titulo}
                  className="rounded-2xl border border-[#d6e4f5] bg-[#f6faff] p-5"
                >
                  <h3 className="text-base">{o.titulo}</h3>
                  <p className="mt-1.5 leading-relaxed text-[#33405e]">{o.texto}</p>
                </div>
              ))}
            </div>
          </div>
          {medios.videoDemo && (
            <div className="mt-14">
              <Video src={medios.videoDemo} titulo="Demostración con las preguntas de siempre" />
            </div>
          )}
        </Seccion>

        {/* ── 6. Beneficios ────────────────────────────────────────────── */}
        <Seccion id="beneficios" titulo={BENEFICIOS.encabezado} subtitulo={BENEFICIOS.subtitulo}>
          <ul className="grid gap-x-10 gap-y-9 md:grid-cols-2">
            {BENEFICIOS.items.map((b, i) => {
              const Icono = ICONOS_DE_BENEFICIOS[i] ?? Check;
              return (
                <li key={b.titulo} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-[#1f56e0] shadow-[0_1px_0_#d6e4f5,0_6px_16px_-10px_rgba(31,86,224,0.5)]">
                    <Icono aria-hidden className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg leading-snug">{b.titulo}</h3>
                    <p className="mt-1.5 leading-relaxed text-[#33405e]">{b.texto}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-14 rounded-3xl border-2 border-[#fe6700] bg-white p-6 sm:p-10">
            <h3 className="flex items-center gap-3 text-2xl">
              <ShieldCheck aria-hidden className="size-7 shrink-0 text-[#fe6700]" />
              {BENEFICIOS.nuncaHace.titulo}
            </h3>
            <ul className="mt-6 grid gap-5 md:grid-cols-3">
              {BENEFICIOS.nuncaHace.puntos.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed text-[#33405e]">
                  <X aria-hidden className="mt-1 size-5 shrink-0 text-[#b84a00]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-[#f3dccb] pt-5 font-bold">
              {BENEFICIOS.nuncaHace.cierre}
            </p>
          </div>
        </Seccion>

        {/* ── 7. Prueba social: sin un caso real, no se muestra ─────────── */}
        {hayPruebaSocial && (
          <Seccion
            id="agencias"
            titulo={PRUEBA_SOCIAL.encabezado}
            subtitulo={PRUEBA_SOCIAL.subtitulo}
            fondo="bg-white"
          >
            <ul className="grid gap-6 md:grid-cols-3">
              {PENDIENTES.testimonios.map((t) => (
                <li
                  key={t.nombre}
                  className="flex flex-col rounded-2xl border border-[#d6e4f5] bg-[#f6faff] p-6"
                >
                  {t.video && <Video src={t.video} titulo={`Testimonio de ${t.nombre}`} />}
                  {t.numeros && t.numeros.length > 0 && (
                    <ul className="mb-4 space-y-1 font-bold text-[#1f56e0]">
                      {t.numeros.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  )}
                  <blockquote className="flex-1 leading-relaxed">“{t.cita}”</blockquote>
                  <div className="mt-5 flex items-center gap-3">
                    {t.foto && (
                      // eslint-disable-next-line @next/next/no-img-element -- foto chica de testimonio
                      <img
                        src={t.foto}
                        alt=""
                        className="size-11 rounded-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <p className="text-sm leading-tight">
                      <span className="font-bold">{t.nombre}</span>
                      <br />
                      <span className="text-[#4a5672]">
                        {t.rol}, {t.agencia}
                        {t.ciudad ? ` (${t.ciudad})` : ""}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            {PENDIENTES.cifras.length > 0 && (
              <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                {PENDIENTES.cifras.map((c) => (
                  <div key={c.descripcion} className="rounded-2xl bg-[#081226] p-6 text-white">
                    <dt className="text-[#c3cfe6]">{c.descripcion}</dt>
                    <dd className="mt-1 font-[family-name:var(--font-gilroy)] text-4xl">
                      {c.valor}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </Seccion>
        )}

        {/* ── 8. Oferta y 9. Garantía ──────────────────────────────────── */}
        <Seccion
          id="oferta"
          titulo={OFERTA.encabezado}
          subtitulo={OFERTA.subtitulo}
          fondo={hayPruebaSocial ? undefined : "bg-white"}
        >
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-[#d6e4f5] bg-[#f6faff] p-6 sm:p-8">
              <p className="text-lg leading-relaxed">
                {textoDelPrecio(PENDIENTES.precioImplementacion, PENDIENTES.precioAbono)}
              </p>
              <h3 className="mt-7 text-base tracking-wider text-[#4a5672] uppercase">Incluye</h3>
              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {OFERTA.incluye.map((item) => (
                  <li key={item} className="flex gap-2.5 leading-snug">
                    <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-[#1f56e0]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <BotonDemo />
              <Microtexto />
              <aside
                aria-labelledby="garantia-titulo"
                id="garantia"
                className="rounded-3xl border-2 border-dashed border-[#1f56e0] bg-white p-6"
              >
                <h3 id="garantia-titulo" className="text-xl leading-snug">
                  {GARANTIA.encabezado}
                </h3>
                <p className="mt-3 leading-relaxed text-[#33405e]">{GARANTIA.cuerpo}</p>
              </aside>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#d6e4f5] p-6">
              <h3 className="flex items-center gap-2 text-lg">
                <Check aria-hidden className="size-5 text-[#1f56e0]" /> Para quién es
              </h3>
              <p className="mt-3 leading-relaxed text-[#33405e]">{OFERTA.paraQuienEs}</p>
            </div>
            <div className="rounded-2xl border border-[#d6e4f5] p-6">
              <h3 className="flex items-center gap-2 text-lg">
                <X aria-hidden className="size-5 text-[#b84a00]" /> Para quién no es
              </h3>
              <ul className="mt-3 space-y-2 leading-relaxed text-[#33405e]">
                {OFERTA.paraQuienNoEs.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </Seccion>

        {/* ── 10. Preguntas frecuentes ─────────────────────────────────── */}
        {preguntas.length > 0 && (
          <Seccion id="preguntas" titulo={PREGUNTAS.encabezado} angosta>
            <div className="divide-y divide-[#d6e4f5] rounded-2xl border border-[#d6e4f5] bg-white">
              {preguntas.map((p, i) => (
                <details key={p.pregunta} open={i === 0} className="group px-5 sm:px-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-lg leading-snug font-bold [&::-webkit-details-marker]:hidden">
                    {p.pregunta}
                    <ChevronDown
                      aria-hidden
                      className="mt-1 size-5 shrink-0 text-[#1f56e0] transition-transform group-open:rotate-180 motion-reduce:transition-none"
                    />
                  </summary>
                  <p className="pb-5 leading-relaxed text-[#33405e]">{p.respuesta}</p>
                </details>
              ))}
            </div>
          </Seccion>
        )}

        {/* ── 11. Llamado final ────────────────────────────────────────── */}
        <section
          id="demo"
          aria-labelledby="demo-titulo"
          className="scroll-mt-4 bg-[#0f2a6b] text-white"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-24">
            <div>
              <h2 id="demo-titulo" className="text-3xl leading-tight text-balance sm:text-[2.6rem]">
                {LLAMADO_FINAL.encabezado}
              </h2>
              <p className="mt-4 text-xl font-bold text-[#ffb27a]">{LLAMADO_FINAL.subtitulo}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#d2ddf3]">
                {LLAMADO_FINAL.cuerpo}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 text-[#0b1733] sm:p-8">
              {medios.fotoDeLaDemo && (
                <div className="mb-6 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element -- foto de quien atiende la demo */}
                  <img
                    src={medios.fotoDeLaDemo.src}
                    alt=""
                    className="size-16 rounded-full object-cover"
                    loading="lazy"
                  />
                  <p className="leading-tight">
                    <span className="font-bold">{medios.fotoDeLaDemo.nombre}</span>
                    <br />
                    <span className="text-[#4a5672]">{medios.fotoDeLaDemo.rol}</span>
                  </p>
                </div>
              )}
              <BotonDemo />
              <Microtexto />
            </div>
          </div>
        </section>
      </main>

      {/* ── 12. Pie de página ─────────────────────────────────────────── */}
      <footer className="bg-[#081226] text-sm text-[#a9b6d0]">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-10 sm:px-6">
          <p className="font-bold text-white">
            {[NOMBRE_DEL_PRODUCTO, pie.razonSocial, pie.cuit && `CUIT ${pie.cuit}`]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {(pie.whatsapp || pie.correo || pie.direccion) && (
            <p className="flex flex-wrap gap-x-2">
              {[
                pie.whatsapp && (
                  <a
                    key="wa"
                    href={`https://wa.me/${pie.whatsapp.replace(/\D/g, "")}`}
                    className="underline underline-offset-2"
                  >
                    WhatsApp: {pie.whatsapp}
                  </a>
                ),
                pie.correo && (
                  <a
                    key="mail"
                    href={`mailto:${pie.correo}`}
                    className="underline underline-offset-2"
                  >
                    {pie.correo}
                  </a>
                ),
                pie.direccion && <span key="dir">{pie.direccion}</span>,
              ]
                .filter(Boolean)
                .flatMap((el, i) =>
                  i > 0
                    ? [
                        <span key={`s${i}`} aria-hidden>
                          ·
                        </span>,
                        el,
                      ]
                    : [el],
                )}
            </p>
          )}
          {(pie.instagram || pie.linkedin) && (
            <p className="flex gap-4">
              {pie.instagram && (
                <a
                  href={pie.instagram}
                  className="underline underline-offset-2"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Instagram
                </a>
              )}
              {pie.linkedin && (
                <a
                  href={pie.linkedin}
                  className="underline underline-offset-2"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              )}
            </p>
          )}
          <nav aria-label="Legales" className="flex flex-wrap gap-x-5 gap-y-2">
            {pie.privacidad && (
              <a href={pie.privacidad} className="underline underline-offset-2 hover:text-white">
                Política de privacidad
              </a>
            )}
            {pie.terminos && (
              <a href={pie.terminos} className="underline underline-offset-2 hover:text-white">
                Términos y condiciones
              </a>
            )}
            <a
              href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario"
              className="underline underline-offset-2 hover:text-white"
              rel="noopener noreferrer"
              target="_blank"
            >
              Defensa del consumidor
            </a>
          </nav>
          <p>© 2026 {NOMBRE_DEL_PRODUCTO}</p>
        </div>
      </footer>

      <BarraFijaMovil href={ENLACE} texto={CTA.boton} externo={EXTERNO} />
    </div>
  );
}

/* ─── Piezas ──────────────────────────────────────────────────────────── */

function BotonDemo({ tamano = "grande" }: { readonly tamano?: "grande" | "chico" }) {
  const medidas =
    tamano === "grande"
      ? "min-h-14 w-full px-5 text-base sm:px-6 sm:text-lg"
      : "min-h-10 px-4 text-sm";
  return (
    <a
      href={ENLACE}
      {...(EXTERNO ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f56e0] text-center font-bold text-white shadow-[0_10px_24px_-12px_rgba(31,86,224,0.75)] transition-colors hover:bg-[#1846bd] focus-visible:ring-4 focus-visible:ring-[#fe6700]/60 focus-visible:outline-hidden ${medidas}`}
    >
      {CTA.boton}
      <ArrowRight
        aria-hidden
        className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
      />
    </a>
  );
}

function Microtexto() {
  return <p className="mt-3 text-sm leading-relaxed text-[#4a5672]">{CTA.microtexto}</p>;
}

function Seccion({
  id,
  titulo,
  subtitulo,
  fondo,
  angosta = false,
  children,
}: {
  readonly id: string;
  readonly titulo: string;
  readonly subtitulo?: string;
  readonly fondo?: string;
  readonly angosta?: boolean;
  readonly children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={`scroll-mt-4 ${fondo ?? ""}`}>
      <div className={`mx-auto px-4 py-20 sm:px-6 lg:py-24 ${angosta ? "max-w-3xl" : "max-w-6xl"}`}>
        <div className="mb-12 max-w-3xl">
          <h2 id={`${id}-titulo`} className="text-3xl leading-tight text-balance sm:text-[2.5rem]">
            {titulo}
          </h2>
          {subtitulo && (
            <p className="mt-4 text-lg leading-relaxed text-[#33405e] sm:text-xl">{subtitulo}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function Video({ src, titulo }: { readonly src: string; readonly titulo: string }) {
  return (
    <video
      className="aspect-video w-full rounded-2xl bg-[#081226]"
      src={src}
      controls
      playsInline
      preload="none"
      aria-label={titulo}
    />
  );
}

/** La distancia entre la consulta del domingo y la respuesta del lunes. */
function RelojDelProblema() {
  return (
    <div
      role="img"
      aria-label="La consulta entra el domingo a las 22:04 y la primera respuesta sale el lunes a las 10:12: doce horas sin contestar."
      className="mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.04] p-7"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-bold tracking-wider text-[#8fa3c8] uppercase">Domingo</span>
        <span className="font-[family-name:var(--font-gilroy)] text-3xl">22:04</span>
      </div>
      <p className="mt-1 text-[#c3cfe6]">“¿Sigue disponible el Corolla?”</p>

      <div className="my-6 flex items-center gap-3 text-[#ffb27a]">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#fe6700]/70" />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fe6700]/50 px-3 py-1 text-sm font-bold">
          <Clock aria-hidden className="size-4" /> 12 h sin respuesta
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#fe6700]/70" />
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-sm font-bold tracking-wider text-[#8fa3c8] uppercase">Lunes</span>
        <span className="font-[family-name:var(--font-gilroy)] text-3xl text-[#8fa3c8]">10:12</span>
      </div>
      <p className="mt-1 text-[#8fa3c8]">Primera respuesta. El comprador ya fue a ver otro auto.</p>
    </div>
  );
}

/** Qué hace el asistente y en qué momento pasa a una persona. */
function RecorridoDeLaConsulta() {
  const tramos = [
    {
      Icono: MessageCircle,
      quien: "Entra la consulta",
      que: "A cualquier hora, por la unidad que vio publicada.",
    },
    {
      Icono: Inbox,
      quien: "El asistente",
      que: "Responde con datos y fotos, pregunta por el usado, la forma de pago y para cuándo lo quiere, y agenda la visita.",
    },
    {
      Icono: UserRound,
      quien: "Tu vendedor",
      que: "Negocia, tasa el usado, aprueba la financiación y cierra. Recibe el caso con el resumen hecho.",
    },
  ] as const;
  return (
    <ol className="space-y-3">
      {tramos.map(({ Icono, quien, que }, i) => (
        <li
          key={quien}
          className={`flex gap-4 rounded-2xl border p-5 ${
            i === 2 ? "border-[#fe6700]/40 bg-[#fff6ef]" : "border-[#d6e4f5] bg-white"
          }`}
        >
          <span
            className={`grid size-10 shrink-0 place-items-center rounded-xl ${
              i === 2 ? "bg-[#fe6700] text-white" : "bg-[#e6eefc] text-[#1f56e0]"
            }`}
          >
            <Icono aria-hidden className="size-5" />
          </span>
          <div>
            <p className="font-bold">{quien}</p>
            <p className="mt-0.5 leading-relaxed text-[#33405e]">{que}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
