# TripFlowApp — paquete de recursos para Codex

Fuente: archivos exportados del Figma del usuario y composiciones existentes de su antiguo portafolio de Notion.

## Uso por sección (recomendación)
- Hero: `showcase-existente/01-hero-viaje-mapa.png` o `05-mockup-tres-pantallas.png` (composiciones antiguas; no redibujar).
- Planificación: `ui-original/01-nuevo-viaje.png` + `showcase-existente/03-mockup-nuevo-viaje.png`.
- Gastos: `ui-original/03-nuevo-gasto.png` + `showcase-existente/04-mockup-dos-pantallas.png`.
- Dashboard: `ui-original/04-dashboard.png` + `showcase-existente/02-mockup-dashboard.png`.
- Flujo: `investigacion-referencia/01-journey-flow.png` (abrir ampliado, no apilar gigante).
- Benchmark: `investigacion-referencia/02-benchmark-grafico.png` si sirve para explicar una decisión.
- Apoyo: vistas originales de login, perfil, ajustes y splash solo cuando aporten a la historia.

## Restricciones editoriales
- El documento original presenta -59 % de tiempo, -40 % de pasos, +25 % de retención, 85 % de satisfacción y 8.5/10 de usabilidad como proyecciones u objetivos. NO presentar como resultados medidos.
- El 77 % de abandono es una afirmación del caso anterior cuya fuente metodológica no está verificada aquí. No convertirla en hecho general ni atribuirla a TripFlow como dato propio.
- No mostrar una cifra SUS 8.5/10 como puntaje SUS medido: SUS estándar se expresa en escala 0–100 y no hay instrumento aportado.
- No inventar entrevistas, pruebas de usuario, muestras, métricas, resultados ni pantallas. Si se mencionan investigaciones, presentarlas como documentadas por el autor y no afirmar validación independiente.
- La imagen `05-impacto-proyectado.png` y `06-metricas-objetivo.png` solo podrían mostrarse con aviso visible 'Proyección/hipótesis, no resultado validado'; mejor resumir 2–3 metas narrativas que incrustar gráficos con una lectura causal engañosa.
- No usar mockups ilustrativos nuevos como evidencia primaria. Mantener capturas reales y vista ampliada fiel.

## Implementación
Extraer esta carpeta en `public/projects/tripflow/` manteniendo la estructura. Codex debe verificar que los archivos existen y que no haya duplicados ya presentes.
