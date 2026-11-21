# Home: edición narrativa y scrollytelling breve

## Cambios

- Hero: dieciséis términos en siete posiciones reservadas. Opacidades ambientales de .22–.31, tres trayectorias suaves y ciclos de duraciones distintas (37–67 s) para reducir la repetición perceptible. Las zonas del texto, CTA y orbe se respetan; no hay eventos de puntero en las palabras. En tablet disminuye la densidad y en móvil se oculta la capa. ES/EN, pausa por visibilidad y movimiento reducido se mantienen.
- Encabezado de proyectos: «Proyectos · Distintos contextos» / «Projects · Different contexts». Solo se modifica ese microcopy. Los siete casos y el controlador del carrusel no cambian.
- Momentos: el grado en Diseño Industrial protagoniza la columna izquierda; especialización y recuerdo universitario tienen escalas y composiciones distintas a la derecha. En móvil siguen una secuencia vertical. Mismos archivos, pies y contextos, sin filtros ni recortes de personas; sizes de Next/Image ajustados al nuevo layout.
- Historias: `src/data/personal-stories.ts` contiene íntegramente los subtítulos y ocho párrafos suministrados por Iván. Se mantienen las cuatro imágenes y títulos existentes. Clic/Enter abre o fija el desplegable, permitiendo leerlo después de retirar el cursor; otro clic lo cierra. Hover y toque siguen disponibles. La versión inglesa conserva matices como los aproximadamente 18 años de taekwondo y la oportunidad cercana a la Selección Colombia, sin afirmar pertenencia al equipo.

## Interludio entre Momentos y Capacidades

`home-process.tsx`, `home-process-motion.ts` y su CSS presentan las tres etapas aprobadas. Se usa CSS sticky y scroll nativo: no se instala GSAP porque la arquitectura existente resuelve este recorrido sin nuevas dependencias. La fijación solo opera desde 1000 px de ancho y 700 px de alto, y abarca 85 svh de desplazamiento. El usuario puede avanzar y retroceder o saltar a otros bloques con la navegación existente.

El contador cambia 01/03 → 02/03 → 03/03 según el progreso real. El mensaje activo siempre tiene opacidad base 1: una entrada de 360 ms y 8 px termina por sí sola y evita dejar texto invisible cuando el usuario se detiene entre fases. Los diagramas tienen un desplazamiento vertical ligado al scroll; una capa ambiental independiente se desplaza con menor intensidad y sentido contrario. Son esquemas conceptuales en SVG, no capturas de trabajos ni funcionalidades de un producto. No se añade Canvas ni se modifican materiales, geometría o movimiento de la escena existente.

Móvil, tablet, movimiento reducido y pausa manual reciben los tres artículos en secuencia vertical, sin fijación. Sin JavaScript también se muestran los tres contenidos. La estructura semántica conserva los tres mensajes para lectura asistida y no anuncia el contador continuamente. No se interceptan rueda, teclado ni gestos, ni se ejecutan comandos de scroll. Un solo RAF se solicita cuando hay eventos y la sección está visible; no hay un bucle automático. Se limpian animaciones, observadores y listeners.

## Archivos principales

- `immersive-home/ambient-kinetic-typography.*`: vocabulario, luminosidad y trayectorias.
- `home-project-gallery.tsx`: microcopy.
- `home-moments.tsx` / CSS: composición asimétrica y tamaños responsive.
- `personal-stories.ts`, `interest-cards.tsx`, `refinements.module.css`: historias, subtítulos, lectura y despliegue.
- `home-process*`, `home-view.tsx`: nuevo puente narrativo y ubicación.
- `src/i18n/en.json`: traducciones nuevas.

## Validación

Se ejecutaron ESLint, compilación webpack y TypeScript; pruebas de tres fases reversibles, límites, pausa fuera de pantalla, pestaña oculta, limpieza de recursos, preferencia de movimiento y modo móvil; pruebas existentes de orbe, cámara, partículas, carrusel, autoplay, bucle y traducción. Se revisan también las respuestas locales ES/EN y el resultado en navegador en escritorio, tablet y móvil.

La evaluación de rendimiento se limita a arquitectura, suspensión, ausencia de bucles añadidos, comportamiento observado y consola. No se ejecuta Lighthouse ni se aportan puntuaciones o Core Web Vitals de campo.
