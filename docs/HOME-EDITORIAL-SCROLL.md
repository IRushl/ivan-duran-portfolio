# Home: ritmo, centrado y parallax vertical

## Alcance

Refinamiento de la implementación aprobada en `0c97187`, sin reconstruir el Home. Se conservan todos los copies, las fotografías originales, Hero, orbe, partículas, palabras flotantes, Sobre mí, carrusel y dots, timeline, capacidades, intereses, contacto, traducciones y casos. Solo se retiran números de las introducciones y la historia fotográfica.

## Parámetros centralizados

`src/components/home-story-config.ts` controla:

- Frases: 1,6 alturas de viewport (160svh) de recorrido fijado por etapa; antes había 30svh para toda la transición.
- Fotografías: 2 alturas de viewport (200svh) por etapa; antes había 105svh para las tres historias.
- Entrada / lectura / salida: .2 / .6 / .2. Se normalizan los porcentajes para que compartan una escala coherente.
- Desplazamiento de frases durante entrada/salida: 24px. Durante la lectura permanecen centradas e inmóviles.
- Desplazamiento de relatos fotográficos: 1,08 veces la altura de su ventana de lectura.
- Crossfade fotográfico: 1 vez el intervalo compartido de salida/entrada. Puede acortarse desde `photoCrossfade`.

El recorrido total fijado se calcula como número de etapas × distancia por etapa. La altura del marco se suma a esa distancia, evitando un relleno desconectado del pin. La primera y última frase conservan su lectura durante la llegada y salida natural de la sección.

## Arquitectura conservada

`home-story-motion.ts` sigue siendo el único controlador reutilizable. No había GSAP ni ScrollTrigger instalados: se preservan scroll nativo, CSS sticky y un RAF solicitado cuando hay eventos. No se instala otro motor. El progreso real determina directamente opacidad, posición y fotografía; no se usan temporizadores ni animaciones independientes para cambiar relatos. Subir recorre exactamente la misma secuencia en sentido contrario.

`home-story-transition.tsx` elimina la numeración y la variante de alineación. Su CSS centra los trece mensajes horizontal y verticalmente en el área útil bajo el navbar, conservando tamaños y un ancho máximo de lectura de 20ch.

En `home-moments.tsx`, cada figcaption contiene su ventana y el bloque móvil de texto. La foto y la copia tienen pistas separadas: foto izquierda con crossfade, relato derecho con desplazamiento vertical dentro de una máscara. Las ventanas comparten altura basada en el relato más alto más 48px de reserva. La separación entre los bloques desplazados evita superponer líneas de dos historias. Durante la permanencia, título y párrafo se muestran completos, sin movimiento.

`home-scroll-narrative.tsx` distingue `narrative` y `photo`, conservando montaje, desmontaje y actualización por idioma. `home-view.tsx` solo retira las antiguas variantes izquierda/derecha.

## Adaptación y accesibilidad

La versión fijada opera desde 1000px de ancho y 700px de alto. Tablet/móvil, prefers-reduced-motion, pausa manual y ausencia de JavaScript presentan todos los contenidos en secuencia normal, sin distancias extendidas ni máscaras. Si el texto aumentado o una traducción no caben íntegramente en la ventana fotográfica, también se libera la fijación de esa historia. Los anchors y el teclado siguen usando el comportamiento existente.

La escena 3D y sus partículas no se duplican. El controlador cancela su RAF al ocultar la pestaña o abandonar el viewport y limpia estilos, listeners y observadores. No crea animaciones autónomas adicionales.

## Verificaciones realizadas

- Build de producción webpack, TypeScript y ESLint correctos.
- `work/verify-story-rhythm.cjs`: permanencia 20/60/20, distancias 160/200vh, reversibilidad, límites, ausencia de superposición de frases, crossfade complementario, desplazamiento de relatos, cálculo de máscara, fallback para texto grande, un RAF por evento, suspensión y limpieza.
- Pruebas existentes de carrusel, autoplay y localización correctas.
- Home y siete casos devuelven 200 en ES/EN.
- Navegador 1440×1000: seis introducciones con alineación central y desviación medida de 0px respecto al centro de su marco; primera secuencia 1→2→3→2; permanencia comprobada tras recorrer 500px adicionales sin cambiar frase. No hay contadores de scrollytelling.
- Fotografía: dos cambios con desplazamientos medidos de texto, mezcla sincronizada y retorno; las tres historias quedan completas en sus fases de lectura. Revisado también 1024×768: el relato más alto (353px) cabe en la ventana (401px).
- Tablet 820×1180 y móvil 390×844: sin desbordamientos, secuencia normal, textos sin transformaciones ni máscara y frases centradas.
- Dot de TripFlowApp comprobado: activa el proyecto correspondiente. Accesos directos a proyectos y contacto operativos. Cambio ES/EN y pausa manual comprobados; prefers-reduced-motion cubierto además por el test del controlador.
- No se ejecutaron mediciones nuevas de FPS, Lighthouse ni Core Web Vitals; no se atribuyen puntuaciones o mejoras cuantificadas de rendimiento.
