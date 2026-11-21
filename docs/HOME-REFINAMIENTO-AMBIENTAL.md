# Refinamiento ambiental del Home

## Alcance

Se conservan la composición principal, geometría, materiales, movimiento y renderizador del orbe y sus partículas. No se modifican navbar, casos, timeline, capacidades, intereses ni contacto. El retrato mantiene la versión sin pérdida de 1254 × 1254 incorporada previamente.

## Tipografía ambiental

`immersive-home/ambient-kinetic-typography.tsx` y su CSS añaden cinco posiciones estables, con nueve términos que se alternan. Son una capa HTML decorativa, no nuevos objetos Three.js. Tamaños, opacidades y desplazamientos distintos sugieren distancias; una exclusión transparente alineada con el espacio del orbe impide pintar letras sobre sus facetas. No se cambia el Canvas para conseguirlo.

Solo se animan transformaciones y opacidad, con duraciones de 29–44 segundos y recorrido de aproximadamente 20 px. La capa no ocupa espacio de layout ni recibe eventos; está marcada `aria-hidden`. El contenido principal conserva su prioridad visual. Un observador de intersección pausa las animaciones al salir del Hero; también se pausa al ocultar la pestaña. Movimiento reducido y la preferencia de pausa existente producen una vista estática. La capa se oculta a 650 px o menos y reduce su densidad en tablet. No añade RAF ni otro sistema de partículas.

El vocabulario responde al idioma vigente. Diseño → Design; Prototipado → Prototyping. Se mantienen los nombres habituales de disciplinas como UX Research y Design Systems.

## Limpieza puntual

Se retira únicamente el CTA «Ver mi trayectoria» de Sobre mí y su estilo exclusivo. Se mantiene el resto de la sección, incluido el retrato sin pérdida.

El progreso animado del carrusel ya no se renderizaba. La línea observada en la grabación corresponde al scrollbar nativo del contenedor horizontal: ahora se oculta con CSS en los navegadores compatibles, manteniendo overflow-x, gesto táctil, trackpad, teclado, flechas y siete puntos. Controlador, timer de 3000 ms, pausa y bucle no se modifican.

## Momentos personales

`home-moments.tsx` reutiliza tres archivos existentes:

- `public/about/formacion-diseno-industrial.webp` — recurso 06, grado UPTC 2023 acompañado por la familia.
- `public/about/formacion-mercadotecnia.webp` — recurso 05, especialización UPTC 2024.
- `public/about/colaboracion.webp` — recurso 09, reto de una de las últimas clases universitarias. No se presenta como investigación UX ni trabajo para clientes.

Un solo bloque se sitúa después de la experiencia y antes de capacidades. Los pies de foto corresponden al contenido aprobado; traducciones y alts están en `src/i18n/en.json`. Se conservan todos los píxeles/colores de los recursos existentes; la presentación usa contain y Next/Image con carga diferida. Las fotografías verticales se muestran completas y la de equipo no recorta personas. En móvil se presentan dos fotos de formación y, debajo, la foto de equipo. Se reutiliza la entrada breve existente, con clase de layout opcional; no se altera la entrada de Sobre mí.

## Verificaciones reales

- ESLint, build webpack y TypeScript completados.
- Tests del carrusel: transición, siete selecciones, bucle en ambos sentidos, avance a 3000 ms, hover, foco, interacción manual/táctil, visibilidad y reduced motion.
- Tests de la escena existente: perspectiva, cámara reversible, cursor, movimiento autónomo, pausa y liberación de recursos.
- Test nuevo de tipografía: pausa/resume por viewport y pestaña, reduced motion, preferencia manual, alineación de exclusión y limpieza de observadores/listeners.
- Home y siete rutas: HTTP 200 y catálogo renderizado en ES/EN.
- Navegador a 1440, 820, 390 y 320 px: sin desbordamiento horizontal observado; tres imágenes cargadas y completas, pies de foto correctos y sin CTA en el perfil.
- En navegador: transformaciones y opacidad tipográficas cambian con el tiempo; la capa se pausa al salir del Hero y queda estática con la preferencia manual. Se verificó su traducción y su ocultación en móvil.
- Siete puntos visibles, cero controles progressbar, scrollbar none; selección manual mantiene pausa y Ritual Amarte → Redeban funciona. Sin errores de consola observados.

No se ejecutó Lighthouse ni una medición comparativa de FPS o Core Web Vitals; no se atribuyen puntuaciones de rendimiento a estas revisiones.
