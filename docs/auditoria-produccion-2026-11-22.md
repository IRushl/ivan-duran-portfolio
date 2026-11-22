# Estabilización · 22 de noviembre de 2026

## Restauración y alcance

Etiqueta local `audit-pre-production-2026-11-22`: commit `280193b81cbcd5a9413ed460de1869797ba3f314`. La prueba previa de GitHub Pages se conserva en el stash `Restore point: unpublished GitHub Pages experiment before Vercel audit`, fuera de esta entrega.

Se conserva el diseño cian, el orbe, las fotografías, las partículas y el scrollytelling. Los siete casos mantienen sus narrativas e imágenes.

## Problemas y correcciones

- Reproducido en producción: abrir Aurora y pulsar Atrás restablecía Redeban. Ahora se guarda el slug en cada entrada de historial, conservando el estado de Next.js. El almacenamiento de sesión permite recuperar la selección mediante enlaces explícitos. Se pausa el autoplay al restaurar el contexto.
- La llegada a `/#proyectos` podía posicionarse antes de activar los layouts narrativos. ResizeObserver acompaña los cambios de tamaño hasta que el visitante interactúa; Atrás/Adelante conservan la restauración del router. Sin temporizadores arbitrarios.
- Los relatos personales ocupaban columnas estrechas. Las cuatro tarjetas conservan sus textos e ilustraciones; la selección abre un panel ancho debajo. En móvil es vertical y se lleva a la vista. Escape y Cerrar relato devuelven el foco.
- El titular inglés mantiene «complexity to» unido y ajusta su tipografía responsive para evitar «to» aislado.
- Se configura el dominio existente para metadatos, enlaces canónicos y sitemap. Las vistas previas siguen sin indexación.

## Resúmenes de casos

Ya existen introducciones y bloques equivalentes a un resumen ejecutivo en los siete casos. No se duplica contenido.

| Caso | Información existente al comienzo |
| --- | --- |
| Redeban | Rol, entregables, reto Android/Web; prueba técnica sin usuarios reales ni implementación comercial |
| Aurora | Problema de claridad, recorrido, rol UX/UI y prototipo con IA sin impacto validado |
| ARHO | Contexto comercial remunerado, entrega en una semana, interfaces responsive y publicación/impacto sin verificar |
| TripFlowApp | Reto financiero, contribución UX/UI móvil y proyecciones pendientes de validar |
| Paragón | Contribución individual en Comunidad, equipo académico de 11 personas y objetivos sin resultados comerciales medidos |
| Interfaz de Producto | Reto, responsabilidad, sistema multiformato y límites de atribución comercial |
| Ritual Amarte | Autoría de Aura, liderazgo de diseño, contexto preoperativo y experiencia espacial conceptual |

## Validación local

- Lint y TypeScript: primera ejecución tras las correcciones principales sin errores. Se repiten los checks antes del commit.
- Producción: línea base y versión corregida compilan con `next build --webpack`. `npm run build` con Turbopack falló localmente al iniciar un proceso de transformación CSS. No se cambia el compilador del proyecto para ocultarlo.
- HTTP: Home y siete casos en ES/EN, 16 respuestas 200, idioma y metadatos coherentes. CV 200. Sitemap con ocho URLs. Los 73 recursos visuales detectados existen, incluidos los assets generados por Next.
- Navegador: siete recorridos Home → caso → Atrás conservan selección y posición razonable. Comprobados Adelante hacia Ritual Amarte, retorno a proyectos e idioma EN entre rutas.
- Home y siete casos: sin desbordamiento horizontal en los viewports de 320, 375, 390, 430, 768, 1024 y 1440 px solicitados. Inspección visual adicional de Hero y relatos. Emulación de viewport, no dispositivos físicos.
- Relatos: cuatro selecciones, textos íntegros y cierre con Escape con devolución de foco.
- Redeban: cuatro pestañas operativas; Ampliar abre el diálogo y Escape permite cerrarlo.
- Traducciones: revisión de 1.393 cadenas extraídas; las cadenas españolas detectadas tienen traducción, salvo nombres propios. Comprobación adicional de encabezados, párrafos y controles de los siete casos renderizados en EN. Las interfaces originales dentro de imágenes conservan su idioma.
- Pruebas existentes de autoplay, traducción y ritmo narrativo: pasan. Incluyen pausa por interacción/visibilidad, movimiento reducido, reversibilidad y limpieza de listeners/RAF.
- La escena conserva carga diferida, límites de DPR y densidad, pausa en pestañas inactivas y liberación de recursos WebGL. No se cambia su representación visual.
- Sin errores de consola capturados durante los recorridos iniciales.

## Límites de medición

Se intentó Lighthouse 13.6 móvil, pero su navegador no abrió el puerto de diagnóstico. No se obtuvieron puntuaciones. No se afirma certificación WCAG completa ni Core Web Vitals de campo. Se combina revisión de código, compilación, pruebas de lógica, HTTP e interacción en navegador.

## Vercel

Inspeccionado el proyecto `ivan-duran-portfolio-x1a5`: Hobby, repositorio conectado correcto, producción `main`, Next.js, raíz `./`, comandos y salida automáticos, Node 26.x. Dominio: `https://ivan-duran-portfolio-x1a5.vercel.app`.

El estado del despliegue se confirmará después de validar la vista previa y actualizar producción.
