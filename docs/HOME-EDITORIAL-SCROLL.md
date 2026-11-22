# Home: recorrido narrativo continuo

Punto de restauración previo: `3e6d195`. Recupera la versión aprobada antes de estas transiciones.

## Composición

Se retira por completo el antiguo interludio «Mi forma de trabajar» y sus tres archivos `home-process*`. El recorrido pasa a ser Hero → transición de tres frases → Sobre mí → transición → proyectos → transición → experiencia → historia fotográfica → transición → capacidades → transición → intereses → transición → contacto.

Las seis transiciones utilizan las frases suministradas por Iván, con alternancia de alineación central, izquierda y derecha. No duplican los títulos de las secciones. La narrativa fotográfica contiene las tres historias y fotografías reales aprobadas, con indicador 01/03, 02/03, 03/03. Las imágenes conservan su proporción y rostros mediante object-fit: contain.

## Arquitectura

- `home-story-transition.tsx` y `home-story.module.css`: presentación tipográfica reutilizable, renderizada en servidor.
- `home-scroll-narrative.tsx`: límite cliente que monta y desmonta el controlador y reacciona al idioma.
- `home-story-motion.ts`: cálculo genérico para dos o tres etapas, scroll nativo e intervalos sticky independientes.
- `home-moments.tsx` / CSS: narrativa fotográfica de tres momentos, imagen izquierda y texto derecha en escritorio; vertical en móvil.
- `home-view.tsx`: composición del recorrido.
- `src/i18n/en.json`: traducciones de las frases y relatos nuevos.

No se instala GSAP: no forma parte de las dependencias existentes y la arquitectura actual permite resolver la sincronización con scroll real mediante CSS sticky y un RAF solicitado solo al recibir eventos. No se añade Canvas, motor de partículas ni objeto 3D. El Hero, los controladores del carrusel, las cuatro capacidades, las historias personales, contacto, CV y los casos se mantienen.

## Duración y accesibilidad

En escritorio desde 1000 × 700, cada transición ocupa aproximadamente una pantalla: marco de 76svh menos cabecera y 30svh de recorrido fijado. La fotografía reserva un recorrido de 105svh para sus tres etapas. Los mensajes cambian bidireccionalmente por progreso real; una entrada de 420 ms termina por sí sola para que el texto permanezca visible aunque el usuario se detenga en el umbral. El desplazamiento tipográfico máximo es 15 px y el fotográfico aproximadamente 7 px. No se interceptan rueda, teclado ni gestos.

En móvil, tablet, movimiento reducido, pausa manual y sin JavaScript se presentan todos los mensajes y fotografías en orden, sin fijación. Cada transición dispone de un encabezado accesible que reúne las frases, evitando lecturas duplicadas de las versiones visuales. Las fotografías y relatos conservan su semántica. Los anchors existentes permiten omitir introducciones y llegar directamente a proyectos, perfil, capacidades y contacto.

El controlador pausa solicitudes fuera de pantalla o en pestañas inactivas y limpia observadores, listeners, animaciones y RAF. La comprobación de rendimiento se limita a arquitectura, consola y comportamiento observado; no representa una medición de FPS ni de Core Web Vitals.

## Comprobaciones realizadas

- Build de producción webpack y TypeScript: correcto; ESLint: correcto.
- Pruebas del controlador: etapas reversibles, límites, mensaje visible al detenerse, una solicitud RAF por evento, suspensión y limpieza; fallback móvil, prefers-reduced-motion y pausa manual.
- Pruebas existentes del carrusel, autoplay, escena 3D, tipografía ambiental y traducciones: correctas. El aviso de deprecación de Three CJS procede del harness de pruebas, no del bundle de la aplicación.
- Home y siete casos: respuestas 200 y contenido localizado en ES/EN.
- Navegador: primera transición 01→02→03→02; fotografías 01→02→03→02; revisión visual de los seis puentes y etapas finales. Fotos cargadas con contain y textos completos. Selección del carrusel mediante clic y flecha derecha conserva foco y activa Aurora Seguros.
- Navegación del navbar a proyectos, perfil, competencias y contacto operativa. El contacto puede quedar más abajo que el margen del header al alcanzar el final del documento; no se añade relleno artificial para forzar su alineación.
- Escritorio 1440×1000, tablet 820×1180, móvil 390×844 y ancho mínimo 320: sin desbordamiento horizontal. En tablet/móvil todos los relatos quedan en flujo normal. Pausa manual comprobada en navegador: siete historias con modo estático y tres fotos visibles. La preferencia del sistema también está cubierta por el harness del controlador.
- La comparación de Git confirma que Hero, escena, partículas, carrusel, capacidades, historias personales, navegación, contacto, timeline, casos y recursos públicos no se han modificado.
