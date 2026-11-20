# Iván Durán · Portafolio

Portafolio de Product Design en español con cinco proyectos y contenido editable en TypeScript. Requiere Node.js 20.9 o superior.

## Desarrollo local

```bash
npm ci
npm run dev
```

Abre [localhost:3000](http://localhost:3000). En PowerShell puedes usar `npm.cmd` si la política de ejecución bloquea `npm.ps1`.

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Organización

- `src/app/` contiene la portada, el layout, la página 404 y `/proyectos/[slug]`. Los casos se prerenderizan durante la compilación.
- `src/components/` contiene la navegación, las tarjetas, las portadas, el contacto y la estructura de casos.
- `src/data/projects.ts` define los datos introductorios de los cinco proyectos, el orden de la galería y la navegación. `src/data/case-studies.ts` guarda el contenido ampliado. Una entrada `null` muestra la introducción y las secciones pendientes.
- `src/data/profile.ts` centraliza la disponibilidad, el correo, LinkedIn, GitHub y la URL pública. Los canales vacíos aparecen como «Por configurar». El CTA de contacto directo se activa al añadir el primer canal.
- `src/app/globals.css` define los tokens de Tailwind, los estilos de componentes y la adaptación al movimiento reducido.
- `public/` contiene portadas vectoriales ligeras. Para sustituir una portada, cambia `cover.src`, actualiza `cover.alt` y marca `cover.conceptual` como `false` si es material del caso.

## Publicación en Vercel

Sube esta carpeta como repositorio de GitHub o selecciónala como directorio raíz al importar el repositorio en Vercel. Usa la configuración del framework Next.js. Define `SITE_URL` con el dominio público HTTPS en el entorno **Production** y vuelve a desplegar. También puedes definir `profile.siteUrl` como valor de respaldo.

El dominio habilita las canónicas, el sitemap y la imagen social. Los despliegues de vista previa de Vercel y las compilaciones sin un dominio HTTPS válido declaran `noindex`. Revisa `/robots.txt`, `/sitemap.xml` y la vista previa de un caso al publicar.

## Contenido por completar

- Correo profesional, URL de LinkedIn, URL de GitHub y dominio del portafolio.
- Redeban y De lo largo a lo corto tienen una introducción. El desarrollo de sus casos queda pendiente.
- En los casos con contenido ampliado, abre «Ver la evidencia que falta aportar» para consultar los documentos, las comparaciones y las confirmaciones que faltan.
- Para incorporar un entregable visual, añade el archivo a `public/` y configura `media` con `src`, `alt`, `width`, `height` y `caption`. Para publicar un prototipo compartible, rellena `prototype` con su URL HTTPS, la etiqueta y `authorized: true` tras confirmar el permiso.
