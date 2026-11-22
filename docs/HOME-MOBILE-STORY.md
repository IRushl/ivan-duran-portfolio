# Corrección del scrollytelling móvil

## Diagnóstico

El controlador exigía min-width:1000px y min-height:700px. Por eso los teléfonos y tablets recibían una secuencia estática. No se detectó GSAP instalado: la implementación aprobada utiliza CSS sticky y un controlador de scroll nativo. Se extendió ese controlador sin añadir dependencias, Canvas ni otro motor de animación.

## Cambios

- `home-story-config.ts`: conserva escritorio (160svh por frase, 200svh por historia) y añade teléfono (120svh / 160svh) y tablet (130svh / 170svh). Se mantiene la distribución de entrada/lectura/salida 20/60/20 y la misma función de progreso reversible.
- `home-story-motion.ts`: habilita la variante compacta, recalcula medidas con ResizeObserver y conserva suspensión, limpieza y preferencias de movimiento. En teléfonos, reserva el relato más alto y ajusta la altura de la fotografía completa al espacio restante. No intercepta gestos, rueda o teclado.
- `home-story.module.css`: conserva el marco de pantalla útil bajo la navegación y la composición centrada en móvil.
- `home-moments.module.css`: composición vertical móvil con foto completa en contain y ventana de texto; entrada desde abajo, salida hacia arriba y crossfade sincronizado. El título de sección introduce el bloque antes de su tramo fijado. En 320px la foto se reduce más para que los párrafos completos tengan prioridad.
- `ambient-kinetic-typography.*`: posiciones periféricas, dos posiciones en teléfono y medición de las zonas de nombre, subtítulo, titular, párrafos y enlaces. La exclusión se actualiza por tamaño e idioma. El área del orbe sigue protegida con la máscara existente.
- `ambient-typography-exclusion.ts`: une rectángulos que se intersectan antes de generar los huecos de exclusión; evita que los solapamientos vuelvan a abrir zonas sobre el texto. Se protegen elementos de lectura, no contenedores vacíos que ocultarían innecesariamente todo el efecto.

Las dimensiones usan svh: los recorridos no dependen del número de gestos y el marco no sigue la expansión transitoria de la barra del navegador. Un cambio de layout real vuelve a medir los contenidos. Texto ampliado que no pueda caber recibe lectura secuencial completa. Prefers-reduced-motion y pausa manual conservan la presentación estática y todos los contenidos.

No cambian copies, fotografías, ocho ilustraciones de capacidades/intereses, tarjetas, historias, navbar, casos, orbe, partículas o paleta.

## Validación real

- Build de producción y TypeScript correctos; ESLint correcto.
- Harness de timing: fases estables, reversibilidad, distancias desktop preservadas, variante móvil, cambio de breakpoint, crossfade, fallback de texto grande, suspensión y limpieza.
- Harness de tipografía: movimiento decorativo, máscara del orbe, visibilidad, reducción de movimiento y limpieza. Prueba de exclusión: unión de rectángulos superpuestos y límites dentro del Hero.
- Pruebas existentes de carrusel, autoplay y rutas ES/EN correctas. Home y siete casos devuelven 200 en ambos idiomas.
- Emulación de tamaños en navegador: 320×740, 375×812, 390×844, 430×932, 768×1024 y 1440×1000. Sin desbordamiento horizontal. Los trece mensajes caben en su marco. En todas esas variantes el scrollytelling está habilitado con movimiento activo.
- 390px: frases 1→2→3→2; historias fotográficas 1→2→3→2, fotografías sincronizadas y todos los relatos completos durante la lectura. Altura máxima de copia 347px dentro de ventana de 363px. En 320px: copia máxima 463px dentro de ventana de 479px.
- Navegación móvil a proyectos y dot de TripFlowApp operativos. Cambio ES/EN sin perder la experiencia. Pausa manual comprobada: siete secuencias liberan la fijación y los tres relatos quedan visibles sin transformaciones. Reduced motion también cubierto por pruebas del controlador.
- Escritorio conserva 480svh para sus tres frases iniciales, 320svh para los puentes de dos frases y 600svh para las fotografías. El Hero mantiene un solo Canvas, palabras ambientales visibles y zonas de lectura excluidas.

Las pruebas se realizaron en el navegador de escritorio con tamaños emulados. No se dispone aquí de Chrome Android o Safari iOS en dispositivos físicos, por lo que no se atribuye una prueba real en esas plataformas ni de su barra dinámica. No se ejecutó Lighthouse ni se aportan puntuaciones de FPS o Core Web Vitals.

### Pantallas especialmente cortas

Se comprobó adicionalmente 320×568. Cuando no cabe simultáneamente la fotografía y el relato sin ocultar contenido, la historia fotográfica pasa a una secuencia vertical con entradas de texto ligadas al scroll (sin temporizadores), en vez de recortar contenido o desactivar todo el movimiento. Las introducciones cinematográficas siguen fijadas. En 390×844 vuelve a activarse la composición fotográfica fijada. El modo completamente estático queda para movimiento reducido o pausa manual. Esta rama y su limpieza también están cubiertas por el harness.
