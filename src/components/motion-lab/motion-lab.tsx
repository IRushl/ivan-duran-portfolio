'use client';

import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { defaults, type LabSettings } from './trajectory';
import styles from './motion-lab.module.css';
import { SpatialSurface, useSpatialScene } from '../spatial-scene/surface';

const controls: { key: keyof LabSettings; label: string; min: number; max: number; step: number; unit: string }[] = [
  { key: 'depth', label: 'Profundidad de escena', min: 40, max: 100, step: 1, unit: ' u' },
  { key: 'camera', label: 'Recorrido de cámara', min: 0, max: 1.4, step: .05, unit: '×' },
  { key: 'ambient', label: 'Velocidad ambiental', min: 0, max: 2, step: .1, unit: '×' },
  { key: 'mouse', label: 'Respuesta al cursor', min: 0, max: 2, step: .1, unit: '×' },
  { key: 'density', label: 'Partículas solicitadas', min: 160, max: 900, step: 20, unit: '' },
];

export function MotionLab() {
  const journey = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const telemetry = useRef<HTMLSpanElement>(null);
  const settingsRef = useRef<LabSettings>({ ...defaults });
  const pausedRef = useRef(false);
  const [settings, setSettings] = useState<LabSettings>({ ...defaults });
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState('Preparando escena · alternativa estática disponible');

  const onTelemetry = useCallback((text: string) => { if (telemetry.current) telemetry.current.textContent = text; }, []);
  useSpatialScene({ surface, journey, settings: settingsRef, paused: pausedRef, onStatus: setStatus, onTelemetry });

  function update(key: keyof LabSettings, value: number) {
    const next = { ...settingsRef.current, [key]: value };
    settingsRef.current = next;
    setSettings(next);
    surface.current?.dispatchEvent(new Event('labsettings'));
  }

  return <main id="contenido" tabIndex={-1} className={styles.lab}>
    <div className={styles.bar}><Link href="/">← Volver al portafolio</Link><span>Motion Lab <b> / 01</b></span><span className={styles.experimental}>Experimento aislado</span></div>
    <div className={styles.journey} ref={journey}>
      <div className={styles.stage} aria-hidden="true">
        <SpatialSurface surface={surface} />
        <div className={styles.scrim}/>
      </div>
      <div className={styles.story}>
        <section className={styles.hero} aria-labelledby="lab-title">
          <p className={styles.kicker}>Iván Durán / exploración de movimiento</p>
          <h1 id="lab-title">El diseño<br/>también<br/><em>se siente.</em></h1>
          <p className={styles.copy}>Una mirada de producto.<br/>Un espacio para explorarla.</p>
          <a className={styles.scrollLink} href="#lab-transicion">Desplázate para entrar <span aria-hidden="true">↓</span></a>
          <p className={styles.note}>Texto de demostración. La Home permanece intacta.</p>
        </section>
        <section id="lab-transicion" className={styles.middle} aria-labelledby="lab-space-title">
          <p className={styles.kicker}>02 / Entre la idea y la experiencia</p>
          <h2 id="lab-space-title">Cambiar de perspectiva.<br/><em>Ver más allá.</em></h2>
          <p className={styles.copy}>El recorrido continúa. El contenido conserva su lugar.</p>
        </section>
        <section className={styles.arrival} aria-labelledby="lab-arrival-title">
          <p className={styles.kicker}>03 / Del espacio al contenido</p>
          <h2 id="lab-arrival-title">La profundidad<br/>abre paso a <em>las ideas.</em></h2>
          <p className={styles.copy}>El movimiento se calma. Los proyectos toman el protagonismo.</p>
        </section>
      </div>
      <div className={styles.instrument} aria-hidden="true"><span className={styles.liveDot}/><span ref={telemetry}>01 / Ambiente · cámara Z +16,0</span></div>
    </div>
    <section id="lab-proyectos" className={styles.projects} aria-labelledby="lab-projects-title">
      <div><p className={styles.kicker}>Contenido siguiente / demostración</p><h2 id="lab-projects-title">Diferentes desafíos.<br/><em>Una mirada de producto.</em></h2></div>
      <div className={styles.projectGrid}>{['Comprender el problema', 'Dar forma a una decisión', 'Conectar la experiencia'].map((label, i) => <article key={label}><span>0{i + 1}</span><div className={styles.diagram} aria-hidden="true"><i/><i/><i/></div><h3>{label}</h3><p>Bloque de prueba para evaluar la llegada al contenido.</p></article>)}</div>
      <Link href="/#proyectos" className={styles.back}>Explorar los proyectos reales <span aria-hidden="true">↗</span></Link>
    </section>
    <aside className={styles.controls} aria-label="Ajustes del laboratorio">
      <details><summary>Ajustar escena <span aria-hidden="true">＋</span></summary><div className={styles.panel}>
        <p className={styles.panelTitle}>Ajustes en tiempo real</p>
        <p className={styles.status} role="status">{status}</p>
        {controls.map(control => <label key={control.key} htmlFor={`lab-${control.key}`} className={styles.range}><span>{control.label}<output htmlFor={`lab-${control.key}`}>{settings[control.key]}{control.unit}</output></span><input id={`lab-${control.key}`} type="range" min={control.min} max={control.max} step={control.step} value={settings[control.key]} onChange={event => update(control.key, Number(event.target.value))}/></label>)}
        <p className={styles.hint}>La densidad y la resolución se limitan según el dispositivo. Movimiento reducido tiene prioridad.</p>
        <div className={styles.actions}><button type="button" aria-pressed={paused} onClick={() => { pausedRef.current = !paused; setPaused(!paused); surface.current?.dispatchEvent(new Event('labsettings')); }}>{paused ? 'Reanudar movimiento' : 'Pausar movimiento'}</button><button type="button" onClick={() => { settingsRef.current = { ...defaults }; setSettings({ ...defaults }); surface.current?.dispatchEvent(new Event('labsettings')); }}>Restablecer</button></div>
      </div></details>
    </aside>
  </main>;
}
