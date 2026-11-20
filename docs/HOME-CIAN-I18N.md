# Home cian y localización ES/EN

Actualización de la Home oficial inmersiva. Punto de restauración anterior: `25e1d98`.

## Identidad y recursos

- `src/data/home-palette.ts` centraliza los tonos de interfaz y Three.js. Acento #25DCEB. El alcance de los tokens es la Home; los siete proyectos conservan sus colores.
- Se mantiene la geometría facetada, los 42 vértices únicos, tamaño, anclaje y respuesta del orbe. La escena sigue usando una sola instancia WebGL, pausa por visibilidad, densidad móvil limitada y alternativa estática.
- Ocho archivos originales del kit, sin modificaciones, en `public/home/illustrations/`: cuatro capacidades y cuatro intereses. `src/data/home-artwork.ts` define asignaciones y encuadres.
- Las imágenes son ilustraciones conceptuales generadas con IA; se informa en pantalla y en los textos alternativos. No son fotografías ni evidencia de proyectos. Las fotografías personales anteriores permanecen en `public/about/`.
- Se retira la tarjeta Videojuegos. Se conserva el párrafo personal existente, según la instrucción de mantener los textos actuales.

## Movimiento y carrusel

Siete puntos, flechas y avance cada 3.000 ms, con bucle. Sin botón Play/Pausa ni barra de progreso visibles. Hover, foco, interacción manual, pestaña oculta y reduced motion detienen el avance. La selección manual mantiene la pausa.

El menú discreto de preferencias de movimiento de la navbar permite detener y reanudar las animaciones automáticas y la escena. La preferencia se guarda como `portfolio-motion`. No reemplaza la preferencia de movimiento reducido del sistema. Las animaciones de entrada y los parallax de los casos mantienen su comportamiento.

## Idiomas

`src/i18n/` contiene catálogo inglés, traductor, proveedor, selector y límites de presentación para componentes de servidor y cliente. El español original es la clave del catálogo. No se duplican rutas, pantallas ni estados.

La preferencia se guarda en localStorage (`ivan-portfolio-language`) y cookie (`portfolio_locale`). La cookie permite entregar HTML y metadatos en el idioma elegido desde la primera respuesta y al recargar una ruta directa. Estas páginas se renderizan por petición. Al cambiar idioma, el servidor actualiza también los fragmentos editoriales. `html lang`, títulos, descripciones, navegación y controles se localizan.

El recorrido de presentación preserva referencias, eventos, estilos, URLs e identificadores. Solo traduce texto visible, atributos accesibles y slots narrativos explícitos. Los nombres propios se conservan. Las capturas originales, PDF de CV y prototipos externos mantienen su idioma original: no se altera evidencia documental.

Para añadir o editar textos, actualizar también `src/i18n/en.json`. Los formatos interpolados usan `{0}`, `{1}`; el traductor almacena sus expresiones compiladas en caché.

## Validación ejecutada

- ESLint, compilación de producción y comprobación TypeScript de Next.
- Pruebas locales del carrusel: 3 segundos, bucle, selección, hover, foco, touch, visibilidad, reduced motion y limpieza de listeners.
- Pruebas de Three.js: perspectiva, cámara reversible, movimiento autónomo, perturbación del cursor, pausa, densidad móvil, fallback, recuperación de contexto y liberación de recursos.
- Pruebas del traductor y del árbol de presentación: formatos, marcas, identidad de refs, eventos e IDs.
- Respuestas HTTP de Home y siete casos en ES y EN: 200, idioma correcto y ausencia de textos del catálogo español pendientes en los nodos/atributos renderizados.
- Revisión en navegador a 1440, 820, 390 y 320 px: sin desbordamiento horizontal observado. Carga de las ocho ilustraciones, selector y navegación, intereses con teclado, pausa efectiva de frames y pestañas/visor de Redeban traducidos.

No se ejecutó Lighthouse ni se obtuvieron mediciones de campo de Core Web Vitals. No se ha desplegado.

## Revisión editorial antes de publicar

Revisar preferencias terminológicas de la versión inglesa, especialmente la denominación «Charge and Verify» del flujo Redeban y la traducción de títulos académicos. Las limitaciones de evidencia, métricas del brief y autorías se conservan. Las ilustraciones no sustituyen futuras evidencias reales de las capacidades.
