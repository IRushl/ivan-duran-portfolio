# Sobre mí: retrato y presentación editorial

Se transforma la sección existente «Mi perspectiva» y se coloca inmediatamente después del Hero y antes del carrusel. No se añade una segunda presentación personal.

- Retrato suministrado: `assets/originals/ivan-duran-retrato.png`, copia íntegra del archivo del escritorio. Es una imagen editada digitalmente a partir del retrato del propietario, no una fotografía documental sin edición.
- Versión publicada: `public/about/ivan-duran-retrato.webp`, 1000 × 1000, 73.124 bytes. Se conserva el encuadre completo mediante proporción natural y `object-fit: contain`. Next/Image sirve tamaños responsive con carga diferida.
- `home-editorial.tsx`: composición izquierda/derecha, copy definitivo, tags y formación resumida. Las anteriores fotografías de formación y colaboración permanecen disponibles en `public/about/` y no se eliminan del proyecto; el nuevo bloque sustituye esa presentación extendida. «Más allá del diseño» conserva su fotografía y contenido.
- `home-view.tsx`: únicamente reordenación de Sobre mí / proyectos.
- `home-timeline.tsx`: añade el destino accesible `#experiencia` para «Ver mi trayectoria»; su contenido y estructura interna no cambian.
- `home-about-reveal.tsx`: aparición de 10 px / 480 ms una sola vez al entrar en pantalla. Sin movimiento continuo del texto. Contenido visible sin JavaScript; respeta movimiento reducido y limpia observador y animaciones.
- `en.json`: copy inglés suministrado, formación y alt del retrato.

Validación: ESLint sin errores; `npm run build -- --webpack` completó compilación y TypeScript. Revisión en navegador a 1440, 820, 390 y 320 px; retrato cuadrado completo, sin desbordamiento. Orden de siete secciones confirmado, sin «Mi perspectiva» duplicada. Cambio ES/EN, carga del retrato y CTA a experiencia con traslado de foco verificados. Los archivos del Hero, escena, navbar, carrusel y siete casos no se modificaron.
