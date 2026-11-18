# Instrucciones para Claude

- Rama base: `main`. Trabajá en una rama propia y, al terminar cada cambio, commiteá, pusheá y abrí un pull request hacia `main` sin esperar a que te lo pidan.
- No reescribas historia ni uses `push --force` en ramas compartidas.
- El repo tiene dos sitios:
  - Raíz: la landing para concesionarias, un único `index.html` autocontenido (CSS y JS en línea). Proyecto Vercel `tempiax-landing` (https://tempiax-landing.vercel.app). `.vercelignore` deja `agencias/` fuera de ese deploy.
  - `agencias/`: la landing para agencias de autos, en Next.js. Proyecto Vercel `tempiax-agencias` con Root Directory `agencias` (https://tempiax-agencias.vercel.app). El copy y los datos que faltan viven en `agencias/app/contenido.ts`; los pendientes van como `null` o lista vacía y la página oculta lo que falta. Para probarla: `cd agencias && npm ci && npm run build`.
- Nunca subas `fonts/` ni `agencias/public/fonts/` al repositorio: la licencia de Gilroy prohíbe redistribuir el archivo. Solo los `LEEME.txt` están versionados.
- Los datos que faltan van como placeholders visibles entre corchetes (`[NÚMERO DE WHATSAPP]`, etc.). No inventes cifras, clientes ni testimonios.
- Producción: cada merge a `main` despliega los dos proyectos de Vercel.
