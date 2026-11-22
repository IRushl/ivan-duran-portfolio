# Iván Durán — Product Design Portfolio

Portafolio profesional de Iván Camilo Durán Alba, Product Designer y UX/UI Designer. Incluye siete casos de estudio y un Home inmersivo con escena 3D, partículas, scrollytelling responsive y contenido en español e inglés.

## Tecnología

Next.js 16 (App Router), React 19, TypeScript, Three.js, CSS Modules y Tailwind CSS 4. La experiencia contempla navegación por teclado, preferencias de movimiento reducido y una alternativa visual cuando WebGL no está disponible.

## Requisitos

- Node.js **20.9 o superior** y npm.
- Git para clonar y mantener el historial.

No se necesitan claves de API ni archivos de entorno para la ejecución local.

## Ejecución local

```bash
git clone https://github.com/IRushl/ivan-duran-portfolio.git
cd ivan-duran-portfolio
npm ci
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). `npm ci` instala las versiones fijadas en `package-lock.json`. En Windows, si PowerShell bloquea `npm.ps1`, utilizar `npm.cmd` en los mismos comandos.

## Verificación y producción local

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

`npm run build` genera la compilación de producción y `npm start` la sirve localmente en el puerto 3000. Detener previamente el servidor de desarrollo si ocupa ese puerto. Estos comandos no publican el sitio.

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Home inmersivo, perfil, proyectos, experiencia, formación, capacidades, intereses y contacto |
| `/proyectos/redeban` | Redeban — Optimización de la experiencia transaccional |
| `/proyectos/aurora-seguros` | Aurora Seguros — Cotizador Salud Flex |
| `/proyectos/tripflowapp` | TripFlowApp — Viajar sin estrés financiero |
| `/proyectos/paragon` | Paragón — Comunidad y nostalgia digital |
| `/proyectos/de-lo-largo-a-lo-corto` | De lo largo a lo corto — Interfaz de Producto |
| `/proyectos/arho` | ARHO |
| `/proyectos/ritual-amarte` | Ritual Amarte |
| `/motion-lab` | Laboratorio independiente de movimiento y escena 3D |
| `/home-preview` | Vista de comparación conservada durante las iteraciones del Home |

Los casos distinguen el alcance real, la contribución individual y el trabajo conceptual. Las visualizaciones editoriales generadas con IA se identifican como tales; las capturas originales disponibles permanecen en los casos.

## Estructura

```text
src/
  app/                      Rutas, metadatos y estilos globales
  components/               Home, casos e interacciones reutilizables
    immersive-home/         Composición inmersiva y palabras ambientales
    spatial-scene/          Escena Three.js compartida
  data/                     Proyectos, contenido, fotografías y contacto
  i18n/                     Selector, diccionario inglés y localización ES/EN
public/
  about/                    Fotografías del Home
  cv/                       CV descargable
  home/illustrations/       Ilustraciones de capacidades e intereses
  projects/                 Capturas, mockups y documentos de los siete casos
assets/originals/           Retrato original conservado fuera de public/
docs/                       Decisiones y verificaciones de las iteraciones
```

Los recursos de `public/` forman parte del repositorio y deben conservarse para que funcionen las imágenes, ampliaciones y descargas.

## Mantenimiento

- `src/data/projects.ts`: catálogo; cada caso dispone además de datos y componentes específicos.
- `src/data/home.ts`, `home-photos.ts` y `personal-stories.ts`: contenido y recursos del Home.
- `src/i18n/en.json`: traducciones inglesas; los textos originales están en español.
- `src/components/home-story-config.ts`: distancias y movimiento de escritorio, tablet y móvil.
- [Scrollytelling móvil](docs/HOME-MOBILE-STORY.md) y [arquitectura narrativa](docs/HOME-EDITORIAL-SCROLL.md): implementación y verificaciones.

La navegación permite acceder directamente a proyectos y contacto. El control de movimiento y `prefers-reduced-motion` permiten consultar el contenido sin depender de las animaciones.

## Configuración opcional

Producción: [ivan-duran-portfolio-x1a5.vercel.app](https://ivan-duran-portfolio-x1a5.vercel.app).

`src/data/profile.ts` declara la URL pública para los enlaces canónicos, Open Graph y sitemap. `SITE_URL` permite sustituirla si cambia el dominio. No se necesitan variables de entorno ni claves para ejecutar el portafolio. Los previews de Vercel permanecen sin indexación. No deben versionarse archivos `.env` ni credenciales.

El proyecto existente de Vercel es `ivan-duran-portfolio-x1a5`, vinculado a este repositorio, con `main` como rama de producción. Se pueden validar ramas de revisión antes de integrarlas. No se requiere crear otro proyecto ni configurar GitHub Pages. Ver [auditoría de producción](docs/auditoria-produccion-2026-11-22.md).
