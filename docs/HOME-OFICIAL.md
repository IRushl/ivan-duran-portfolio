# Home oficial inmersiva

La ruta `/` utiliza la composición inmersiva aprobada. `/home-preview` redirige a `/`, independientemente de sus parámetros anteriores. El laboratorio permanece en el código; su ruta responde 404 salvo que se habilite explícitamente `ENABLE_INTERNAL_LABS=true` para trabajo interno. No hay selectores de versiones ni enlaces al laboratorio en la Home.

## Cambios

- Hero con la bajada y los microtextos finales en español. Se conserva el orbe facetado, sus vértices luminosos y la interacción del cursor; se añade una oscilación muy pequeña en varios ejes. El tamaño y el área reservada al objeto permanecen iguales.
- Carrusel existente, siete proyectos, siete indicadores y flechas circulares. Avance cada 3000 ms. Hover, foco, interacción táctil, exploración manual, pestaña oculta y movimiento reducido pausan el avance según corresponda. La selección manual permanece pausada hasta que se reanude con el control de icono. Las teclas de dirección, Inicio y Fin mantienen el foco en el selector correspondiente.
- Se retira la barra de progreso, el contador y los mensajes técnicos visibles del carrusel. Se mantiene un botón de pausa accesible, con nombre para lectores de pantalla.
- Perfil, formación y colaboración mediante fotografías reales suministradas. Cuatro WebP en `public/about/`, sin alterar los originales del kit: dos graduaciones, una foto de grupo y una foto personal. Los encuadres completos se conservan con imágenes de altura automática y dimensiones explícitas.
- Cuatro cards de capacidades con categoría, nuevo título, descripción y enlace a evidencia del caso. Se mantienen sus diagramas editoriales hasta recibir imágenes definitivas.
- Cinco afinidades con visuales vectoriales provisionales y desplegables mediante hover o teclado/clic. Su estructura admite sustituir cada ilustración por una imagen real mediante el campo `image`.
- Contacto con iconos de correo, LinkedIn, teléfono y CV. Se conserva el archivo de CV y se utiliza la disponibilidad remota/híbrida indicada por el propietario.

## Rigor editorial

TripFlow conserva planificación de viajes, presupuesto y registro de gastos. El propietario confirmó que no se deben añadir coordinación de grupos ni gastos compartidos a la sinopsis.

Ritual Amarte distingue la visión de su fundadora de la contribución de Iván al diseño visual y a la dirección del showroom conceptual. No se atribuye a Iván la creación académica del negocio.

La imagen de grupo acompaña colaboración y aprendizaje; no se presenta como evidencia de research UX ni como una sesión de un caso concreto. Los borradores de historias del kit no se convierten en hechos ni testimonios. No se utiliza el retrato generado con IA.

## Archivos principales

- `src/components/home-view.tsx`: composición oficial y Hero.
- `src/components/home-editorial.tsx`, `home-editorial.module.css`, `src/data/home-photos.ts`: fotografía, perfil y bloque personal.
- `src/components/home-project-gallery.tsx`, `home-gallery-controller.ts`, `home-gallery-autoplay.ts`, `home-projects.tsx`, `home-projects.module.css`: carrusel, dots y control accesible.
- `src/data/home.ts`: sinopsis y capacidades.
- `src/components/immersive-home/capability-cards.*`, `interest-cards.tsx`, `refinements.module.css`: capacidades y afinidades.
- `src/components/home-contact.tsx`, `home.module.css`: contacto y ritmo de experiencia.
- `src/components/spatial-scene/scene.ts`: oscilación discreta del orbe.
- `src/components/immersive-home/immersive-home.*`: retirada de mensajes internos del renderizador.
- `src/app/home-preview/page.tsx`, `src/app/motion-lab/page.tsx`, `src/app/robots.ts`: acceso público único.

## Comprobaciones

- Lint sin errores ni advertencias y build de producción con TypeScript.
- Pruebas de carrusel: avance a los tres segundos, pausa/resume, foco, hover, interacción manual y táctil, pestaña oculta, movimiento reducido y limpieza. Navegación circular último → primero y primero → último.
- Pruebas del renderizador: cámara reversible, partículas autónomas, respuesta al cursor, un único ciclo de renderizado, límites móviles, pausa, reducción de movimiento y liberación de recursos.
- Revisión visual en escritorio de 1440 px, tablet de 820 px y móviles de 390/320 px, sin desbordamiento horizontal observado. Cuatro capacidades y cinco afinidades; foco visible y funcionamiento mediante teclado.
- Respuestas locales verificadas: Home 200; ruta anterior 307 hacia `/`; laboratorio 404 por defecto; cuatro fotos y CV 200; siete casos 200.
- Se revisó la ausencia de rótulos internos en el HTML de la Home y que los archivos de los casos de estudio permanezcan sin cambios.

Una repetición de la compilación encontró `EPERM` al crear una carpeta generada de `/home-preview` en Windows. El script local de verificación prepara esa carpeta, como ya hacía con otras rutas generadas, y permite repetir el build. Esto no añade dependencias ni modifica la configuración de despliegue.

No se han ejecutado Lighthouse ni mediciones reales de Core Web Vitals; no se atribuyen puntuaciones de rendimiento o conformidad automática.

## Recursos pendientes

- Imágenes originales representativas de las cuatro capacidades, con el contexto del proyecto y la contribución individual.
- Fotografías propias para videojuegos, entrenamiento, tecnología, aprendizaje y creatividad, y las historias específicas que se deseen publicar. Los visuales actuales son ilustraciones, no evidencia fotográfica.

No se ha desplegado en Vercel. Antes del despliegue deben configurarse los datos de dominio del sitio para sus metadatos canónicos y mantenerse deshabilitados los laboratorios internos.
