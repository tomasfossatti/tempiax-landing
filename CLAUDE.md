# Instrucciones para Claude

- Rama base: `main`. Trabajá en una rama propia y, al terminar cada cambio, commiteá, pusheá y abrí un pull request hacia `main` sin esperar a que te lo pidan.
- No reescribas historia ni uses `push --force` en ramas compartidas.
- El repo tiene dos sitios:
  - Raíz: la landing para concesionarias, un único `index.html` autocontenido (CSS y JS en línea). Proyecto Vercel `tempiax-landing` (https://tempiax-landing.vercel.app). El `vercel.json` de la raíz es solo de este proyecto y redirige `/agencias` al sitio de agencias, así su código no queda servido como archivos sueltos. No uses `.vercelignore` en la raíz: Vercel lo aplica también al proyecto de `agencias/` y le borra el código antes del build.
  - `agencias/`: la landing de AutoVenta para agencias de autos, en Next.js. Proyecto Vercel `tempiax-agencias` con Root Directory `agencias` (https://autoventa-agencias.vercel.app; el viejo tempiax-agencias.vercel.app redirige ahí). El copy y los datos que faltan viven en `agencias/app/contenido.ts`; los pendientes van como `null` o lista vacía y la página oculta lo que falta. Para probarla: `cd agencias && npm ci && npm run build`.
- Nunca subas `fonts/` ni `agencias/public/fonts/` al repositorio: la licencia de Gilroy prohíbe redistribuir el archivo. Solo los `LEEME.txt` están versionados.
- Los datos que faltan van como placeholders visibles entre corchetes (`[NÚMERO DE WHATSAPP]`, etc.). No inventes cifras, clientes ni testimonios.
- Producción: cada merge a `main` despliega los dos proyectos de Vercel.
