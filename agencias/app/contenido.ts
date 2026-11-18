/**
 * El copy de la landing para agencias de autos, en un solo lugar.
 *
 * Sale del documento "Tempiax para agencias de autos: copy y estructura de la
 * landing". Los datos que ese documento deja como pendiente están acá como
 * `null` o como lista vacía, y la página decide qué hacer con cada uno:
 *
 *  - lo que tiene que ser real o no aparece (testimonios, logos, cifras,
 *    capturas, videos, foto) se oculta mientras falte;
 *  - las respuestas de preguntas frecuentes todavía no definidas no se
 *    publican, porque una pregunta sin respuesta frena más que su ausencia;
 *  - el precio se nombra sin monto hasta que exista.
 *
 * Para completar un pendiente alcanza con llenar el campo: no hay que tocar los
 * componentes. Mientras `enlaceDeLaDemo` sea `null` la página sale con
 * `noindex`, porque el botón principal todavía no lleva a ningún lado.
 */

export type Testimonio = {
  readonly cita: string;
  readonly nombre: string;
  readonly rol: string;
  readonly agencia: string;
  readonly ciudad?: string;
  readonly foto?: string;
  /** Números de antes y después, por ejemplo "Primera respuesta: 14 h → 40 s". */
  readonly numeros?: readonly string[];
  readonly video?: string;
};

export type Cifra = { readonly valor: string; readonly descripcion: string };

export type PreguntaFrecuente = {
  readonly pregunta: string;
  /** `null` mientras la respuesta no esté definida: la pregunta no se publica. */
  readonly respuesta: string | null;
};

export const NOMBRE_DEL_PRODUCTO = "AutoVenta";

export const CTA = {
  boton: "Quiero ver la demo con mis autos",
  microtexto:
    "Nos pasás 3 autos que tengas publicados y en una videollamada de 20 minutos ves al asistente respondiendo por ellos. Sin compromiso.",
} as const;

/**
 * Pendientes que cambian lo que la página muestra. Cada campo nombra de dónde
 * sale el dato en la tabla de pendientes del documento.
 */
export const PENDIENTES = {
  /**
   * Destino del botón principal: un link de WhatsApp (`https://wa.me/…`), un
   * link rastreable del propio CRM o una agenda. Sin él, el botón baja al
   * llamado final y la página no se indexa.
   */
  enlaceDeLaDemo: "https://wa.me/5492995191821?text=Hola%2C%20quiero%20ver%20la%20demo%20de%20AutoVenta%20con%20mis%20autos" as string | null,
  precioImplementacion: null as string | null,
  precioAbono: null as string | null,
  /** Logos de las primeras agencias, con autorización escrita. */
  logos: [] as readonly { readonly src: string; readonly alt: string }[],
  /** Cifra verificable de trayectoria del equipo. */
  cifraDeTrayectoria: null as string | null,
  testimonios: [] as readonly Testimonio[],
  cifras: [] as readonly Cifra[],
  medios: {
    /** Video de 60 s del hero. Sin él se muestra el chat dibujado. */
    heroVideo: null as string | null,
    heroPoster: null as string | null,
    /** Captura real y anonimizada del chat del domingo respondido el lunes. */
    capturaDelProblema: null as string | null,
    /** Video a cámara de quien implementa, 30 a 60 s. */
    videoSolucion: null as string | null,
    /** Demo de 90 a 120 s con las preguntas de siempre. */
    videoDemo: null as string | null,
    /**
     * Fotos del Corolla del chat del hero, en `public/`. Las que todavía no
     * están subidas se saltean; sin ninguna, el chat muestra marcos con el
     * ícono del auto.
     */
    fotosDelChat: ["/autos/corolla-frente.jpg", "/autos/corolla-atras.jpg", "/autos/corolla-interior.jpg"] as readonly string[],
    /** Foto de quien atiende la videollamada. */
    fotoDeLaDemo: null as { src: string; nombre: string; rol: string } | null,
  },
  pie: {
    razonSocial: null as string | null,
    cuit: null as string | null,
    whatsapp: "+54 9 2995 19-1821" as string | null,
    correo: null as string | null,
    direccion: null as string | null,
    instagram: null as string | null,
    linkedin: null as string | null,
    /**
     * Páginas legales. Quedan en `null` hasta que exista una URL propia, y el
     * pie no muestra un link roto.
     */
    privacidad: null as string | null,
    terminos: null as string | null,
  },
};

/**
 * Las versiones del hero, una por dolor del comprador. La página las rota cada
 * 7 segundos; el botón y el microtexto (`CTA`) son los mismos en todas. La
 * primera es la que se ve sin JavaScript y la que usan los metadatos.
 */
export const HERO_VERSIONES = [
  {
    id: "fuera-de-horario",
    nombre: "Consultas fuera de horario",
    titular: "Cada “¿sigue disponible?” del domingo, contestado antes de que vea otra agencia",
    subtitulo:
      "AutoVenta responde con fotos y datos de tus unidades, pregunta por el usado y la forma de pago y agenda la visita. En 48 horas está andando.",
  },
  {
    id: "vendedores-saturados",
    nombre: "Vendedores saturados",
    titular: "Tus vendedores contestan 40 mensajes para conseguir 3 visitas",
    subtitulo:
      "AutoVenta contesta primero, pregunta presupuesto, forma de pago y para cuándo lo quiere, y le pasa al vendedor solo a quien está listo, con el resumen hecho.",
  },
  {
    id: "vendedor-que-se-va",
    nombre: "Vendedor que se va",
    titular: "Cuando un vendedor renuncia, los clientes se quedan en tu agencia",
    subtitulo:
      "Todas las conversaciones de WhatsApp quedan en una bandeja de la agencia. Si alguien se va, el siguiente retoma cada cliente sabiendo qué se habló.",
  },
] as const;

export type VersionDelHero = (typeof HERO_VERSIONES)[number];

export const HERO: VersionDelHero = HERO_VERSIONES[0];

export const CREDIBILIDAD = [
  "Andando en 48 horas",
  "El asistente lleva el nombre de tu agencia",
  "Tus clientes quedan en un servidor a tu nombre",
] as const;

export const PROBLEMA = {
  encabezado: "El domingo a las 22 entra un “¿sigue disponible el Corolla?”",
  subtitulo: "Si lo contestás el lunes a las 10, esa persona ya fue a ver otro auto.",
  cuerpo:
    "El que escribe un domingo a la noche le preguntó lo mismo a cinco agencias por autos parecidos, y va a ver el primero que le contesta. El lunes tus vendedores arrancan con decenas de chats para sacar unas pocas visitas, cada uno desde su celular y sin que vos veas qué pasó con cada consulta. El que dijo “lo pienso” o “no me dieron el crédito” no vuelve a tener noticias, y la visita del sábado a las 11 nadie la confirma. A fin de mes contás autos entregados, pero no sabés cuántas consultas se perdieron en el camino ni qué publicación te trajo a cada comprador.",
} as const;

export const SOLUCION = {
  encabezado: "Un asistente con el nombre de tu agencia que hace el primer tramo de la venta",
  subtitulo:
    "Contesta en segundos, averigua qué busca la persona, si tiene usado y cómo piensa pagar, y le pasa al vendedor a quien está listo para venir.",
  cuerpo: [
    "AutoVenta conoce tu stock y atiende cada consulta a cualquier hora, con los datos y las fotos de la unidad. Mientras conversa junta lo que tu vendedor necesita para avanzar, y agenda la visita o la prueba de manejo.",
    "Cuando el comprador quiere negociar, cerrar o pide hablar con alguien, pasa la conversación a un vendedor en el momento. Tu cliente termina hablando con una persona, como siempre, y esa persona ya conoce su caso.",
  ],
} as const;

export const COMO_FUNCIONA = {
  encabezado: "Andando en 48 horas desde la primera reunión",
  subtitulo:
    "Vos ponés una reunión de una hora y el stock al día; en las 48 horas siguientes lo dejamos respondiendo consultas reales.",
  pasos: [
    {
      titulo: "Hora 0: una reunión con vos.",
      texto:
        "Nos contás qué unidades vendés, a qué comprador apuntás, cómo trabajás la permuta y la financiación y en qué momento se te caen las ventas. Nos pasás la planilla de stock, las condiciones de financiación, la garantía y los horarios.",
    },
    {
      titulo: "Ese mismo día ordenamos el recorrido del comprador.",
      texto:
        "Definimos con tus palabras las etapas: consultó, tiene usado o financia, visita agendada, vino a la agencia, señó, entregado o no compró. Cada interesado queda en un lugar visible.",
    },
    {
      titulo: "En las primeras 24 horas entrenamos al asistente.",
      texto:
        "Le cargamos tu nombre, tu tono, el stock con precios y fotos y las reglas: qué preguntar primero, qué datos del usado pedir, qué nunca prometer y cuándo pasarle la conversación a un vendedor.",
    },
    {
      titulo: "Antes de las 48 horas lo probamos con vos.",
      texto:
        "“¿Sigue disponible?”, “¿tomás mi Gol 2015?”, “¿financiás sin recibo de sueldo?”, “¿cuál es el último precio?”, “lo vi y tiene un rayón”. Lo ajustamos con vos hasta que responde como tu mejor vendedor, y lo conectamos a tu WhatsApp.",
    },
    {
      titulo: "Desde que arranca, lo acompañamos con números.",
      texto:
        "Tus vendedores ven cada conversación y pueden intervenir, y la primera semana vos o tu jefe de ventas marcan en 15 minutos por día lo que no les gustó. Después revisamos con vos, una vez por mes, consultas, visitas, señas y entregas por vendedor y por canal.",
    },
  ],
  hitos: [
    { dia: "0 h", texto: "Primera reunión: nos pasás el stock, la financiación y cómo vendés." },
    { dia: "24 h", texto: "Te mostramos el asistente respondiendo con tus autos y lo ajustamos con vos." },
    { dia: "48 h", texto: "El asistente responde consultas reales en tu WhatsApp." },
    { dia: "Día 30", texto: "Comparamos las visitas agendadas con las de antes." },
    {
      dia: "Día 90",
      texto:
        "Tenés un trimestre de números para saber qué canal, qué vendedor y qué tipo de unidad te rinde más.",
    },
  ],
  objeciones: [
    {
      titulo: "Si tu stock cambia todos los días",
      texto:
        "Cuando vendés una unidad, avisás y deja de ofrecerla. Si alguien pregunta por un auto vendido, le ofrece los parecidos.",
    },
    {
      titulo: "Si ya probaste un CRM que nadie cargó",
      texto:
        "Acá no hay nada que cargar, porque la conversación misma ubica al interesado en su etapa y registra lo que dijo.",
    },
  ],
} as const;

export const BENEFICIOS = {
  encabezado: "Más visitas a la agencia con el mismo equipo",
  subtitulo: "Lo que cambia en el día a día y lo que hace el asistente en cada caso.",
  items: [
    {
      titulo: "Ninguna consulta queda para el lunes.",
      texto:
        "El comprador recibe respuesta en segundos, aunque sea domingo, con precio, año, kilómetros, versión y fotos, sin tener que pedirlos dos veces. Si la unidad ya se vendió, el asistente le ofrece dos o tres parecidas.",
    },
    {
      titulo: "El usado y la forma de pago llegan con la primera consulta.",
      texto:
        "El asistente pide modelo, año, kilómetros y fotos del usado, cómo piensa pagar y para cuándo quiere el auto, así tu vendedor puede cotizar la permuta el mismo día.",
    },
    {
      titulo: "Tus vendedores atienden a quien va a venir.",
      texto:
        "Reciben al interesado con el resumen hecho y repartido de forma pareja, sin pelear por las consultas. Siguen atendiendo desde el celular, en una bandeja que se parece al WhatsApp, y dedican su tiempo a mostrar autos, tasar y cerrar.",
    },
    {
      titulo: "Visitas que se presentan.",
      texto:
        "El interesado elige día y hora, recibe la confirmación y un recordatorio antes de venir, y si no puede, reprograma en el mismo chat. Cada vendedor empieza el día sabiendo quién viene a la agencia.",
    },
    {
      titulo: "El que dijo “lo pienso” vuelve a tener noticias.",
      texto:
        "Recibe un mensaje a las 24 horas y otro a los 3 días. Quien no compró queda registrado con el motivo y lo que buscaba, una vista te avisa qué interesados se están enfriando y tenés la lista para escribirles cuando entra una unidad parecida.",
    },
    {
      titulo: "Sabés qué publicación y qué vendedor te venden autos.",
      texto:
        "El tablero muestra consultas, visitas, señas y entregas por vendedor, de qué canal llegó cada interesado, la meta de autos del mes y el motivo de cada venta perdida: precio, financiación rechazada, usado mal tasado o falta de stock.",
    },
    {
      titulo: "Te enterás en el momento de lo que no puede esperar.",
      texto:
        "Un comprador listo para señar, una oferta concreta o un reclamo de postventa llegan a tu celular apenas pasan, y podés tomarte un fin de semana sin que la agencia deje de atender.",
    },
    {
      titulo: "Los clientes son de la agencia.",
      texto:
        "El sistema lleva tu nombre y la cartera queda en un servidor a nombre de la agencia. Si un vendedor se va, el siguiente retoma cada cliente sabiendo qué se habló.",
    },
  ],
  nuncaHace: {
    titulo: "Lo que el asistente nunca hace",
    puntos: [
      "Nunca negocia el precio final: informa el precio publicado y la negociación queda en manos del vendedor.",
      "Nunca tasa el usado ni promete la aprobación de un crédito, porque junta los datos y esas decisiones las toma siempre una persona.",
      "Solo ofrece las unidades y condiciones que cargaste, y ante un reclamo, un cliente enojado o una oferta concreta, llama a alguien de tu equipo.",
    ],
    cierre:
      "Todo queda registrado, y cualquier vendedor puede tomar la conversación en cualquier momento.",
  },
} as const;

export const PRUEBA_SOCIAL = {
  encabezado: "Agencias como la tuya, con sus números de antes y después",
  subtitulo:
    "Tiempo de primera respuesta y visitas agendadas, medidos en las dos primeras semanas de cada agencia.",
} as const;

export const OFERTA = {
  encabezado: "Cuesta menos que el margen de un auto",
  subtitulo:
    "Con recuperar una venta por mes que hoy se pierde por contestar tarde, AutoVenta se paga.",
  incluye: [
    "El asistente con tu stock y tu marca",
    "La agenda con confirmación y recordatorio",
    "La bandeja compartida",
    "El seguimiento automático",
    "El tablero",
    "Los avisos al celular",
    "La configuración inicial",
    "Los ajustes semanales del primer mes",
    "La revisión mensual de resultados",
  ],
  paraQuienEs:
    "Agencias multimarca independientes, de usados y 0 km de reventa, con 2 a 10 vendedores, que publican en internet y reciben por WhatsApp más consultas de las que pueden seguir.",
  paraQuienNoEs: [
    "Concesionarios oficiales que ya usan el sistema de la marca",
    "Agencias que venden casi todo por recomendación",
    "Quien busca mandar mensajes masivos a bases compradas",
  ],
} as const;

export const GARANTIA = {
  encabezado: "Si a los 30 días no agendás más visitas que antes, seguimos ajustando sin costo",
  cuerpo:
    "Antes de empezar anotamos cuántas visitas agendaba tu agencia, y en la revisión del día 30 comparamos ese número con el del primer mes. Si no subió, ajustamos el asistente con vos hasta que suba, sin cobrarte ese trabajo. La única condición es que el stock esté al día, porque un asistente que ofrece autos ya vendidos no puede agendar bien.",
} as const;

export const PREGUNTAS: {
  readonly encabezado: string;
  readonly items: readonly PreguntaFrecuente[];
} = {
  encabezado: "Preguntas antes de arrancar",
  items: [
    {
      pregunta: "Me escriben por Marketplace, Mercado Libre e Instagram. ¿Lo atiende igual?",
      respuesta:
        "Sí. AutoVenta se conecta con Marketplace, Mercado Libre e Instagram además de WhatsApp, y atiende las consultas de todos los canales igual. El tablero registra de qué canal llegó cada interesado.",
    },
    {
      pregunta: "¿Al cliente le va a aparecer un menú de “marque 1”?",
      respuesta:
        "No. Le responden enseguida, sin menús de opciones, con las fotos y los datos de la unidad por la que preguntó, y cuando quiere negociar habla con un vendedor que ya conoce su caso.",
    },
    {
      pregunta: "¿El stock lo cargo a mano o se conecta con mi web?",
      respuesta:
        "No lo cargás a mano: AutoVenta se conecta con tu catálogo personalizado, que viene gratis con la instalación. El asistente responde siempre con el stock que tenés publicado ahí.",
    },
    {
      pregunta: "Financio con banco y también en cuotas propias. ¿Sirve igual?",
      respuesta:
        "Sí. En la primera reunión nos pasás tus condiciones de financiación y armamos las preguntas del asistente según cómo financiás. El asistente junta los datos de la forma de pago, y la aprobación la da siempre un vendedor.",
    },
    {
      pregunta: "¿Qué hace el asistente cuando no sabe qué contestar?",
      respuesta:
        "Le pasa la conversación a un vendedor. En las primeras semanas revisamos con tu equipo en qué momentos dudó o derivó, y le enseñamos lo que le faltaba.",
    },
    {
      pregunta: "¿Hay que firmar un mínimo de meses? ¿Hay prueba?",
      respuesta: null,
    },
    {
      pregunta: "¿Trabajan con agencias de mi zona?",
      respuesta: null,
    },
  ],
};

export const LLAMADO_FINAL = {
  encabezado: "Mandanos tres autos de tu stock y mirá cómo los atiende",
  subtitulo:
    "Veinte minutos por videollamada, con tus unidades y las preguntas que tus compradores hacen todas las semanas.",
  cuerpo:
    "Lo que viste en esta página se resume en cinco cambios: cada consulta respondida en segundos a cualquier hora, el usado y la forma de pago pedidos de entrada, visitas con confirmación y recordatorio, vendedores que reciben interesados repartidos parejo y clientes que se quedan en la agencia. En la demo lo comprobás con tus propios autos antes de decidir nada, y te vas sabiendo cómo respondería el asistente al próximo “¿sigue disponible?” de un domingo.",
} as const;

/** El texto del precio: con montos cuando existen, sin ellos mientras falten. */
export function textoDelPrecio(implementacion: string | null, abono: string | null): string {
  const cubre = "que cubre servidor, mantenimiento, actualizaciones y ajustes del asistente";
  if (implementacion && abono) {
    return `Pagás una implementación única de ${implementacion} y un abono mensual de ${abono} ${cubre}.`;
  }
  return `Pagás una implementación única y un abono mensual ${cubre}. El monto te lo pasamos en la demo.`;
}

/** Las preguntas que ya tienen respuesta; las demás esperan su definición. */
export function preguntasPublicables(items: readonly PreguntaFrecuente[]) {
  return items.filter(
    (p): p is PreguntaFrecuente & { respuesta: string } =>
      typeof p.respuesta === "string" && p.respuesta.trim() !== "",
  );
}
