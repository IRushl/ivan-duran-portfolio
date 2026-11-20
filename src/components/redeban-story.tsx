'use client';
import { Localized } from '@/i18n/localized';

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import { cancelCaseMotion, playCaseMotion } from './case-motion';
import styles from './redeban-story.module.css';

type StoryStep = { title: string; content: ReactNode; visual: ReactNode; phone?: boolean; navLabel?: string; imageRatio?: number };

export function RedebanStory({ steps, label, compact = false }: { steps: StoryStep[]; label: string; compact?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const activeIndex = useRef<number | null>(null);
  const requestedIndex = useRef<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const Heading = compact ? 'h4' : 'h3';
  const activate = useCallback((index: number) => {
    activeIndex.current = index;
    setActive(index);
  }, []);
  const selectStage = useCallback((index: number) => {
    const bounds = root.current?.querySelector(`[data-story-step="${index}"] [data-story-copy]`)?.getBoundingClientRect();
    const inView = bounds && bounds.bottom > window.innerHeight * .15 && bounds.top < window.innerHeight * .75;
    requestedIndex.current = inView ? null : index;
    activate(index);
  }, [activate]);

  useEffect(() => {
    const container = root.current;
    if (!container || !('IntersectionObserver' in window)) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      const middle = window.innerHeight / 2;
      const candidates = [...visible].map((target) => {
        const bounds = target.getBoundingClientRect();
        return { index: Number(target.closest('[data-story-step]')?.getAttribute('data-story-step')), distance: Math.abs(bounds.top - middle) };
      }).sort((left, right) => left.distance - right.distance);
      const nearest = candidates[0];
      if (requestedIndex.current !== null) {
        if (candidates.some((candidate) => candidate.index === requestedIndex.current)) requestedIndex.current = null;
        return;
      }
      const current = candidates.find((candidate) => candidate.index === activeIndex.current);
      // Adjacent cards share a row. Keep the chosen stage when equally visible.
      if (current && nearest && current.distance <= nearest.distance + 2) return;
      if (nearest) activate(nearest.index);
    }, { rootMargin: '-15% 0px -25% 0px', threshold: [0, .25, .5, .75, 1] });
    container.querySelectorAll('[data-story-copy]').forEach((step) => observer.observe(step));
    return () => { observer.disconnect(); cancelCaseMotion(container); };
  }, [activate]);

  useLayoutEffect(() => {
    if (active === null) return;
    playCaseMotion(root.current?.querySelector(`[data-story-step="${active}"] [data-story-visual]`) ?? null, 'image');
  }, [active]);

  return <Localized>{(
    <div ref={root}>
      {compact && <nav className={styles.journeyNav} aria-label="Etapas del recorrido Android a Web">
        <ol>{steps.map((step, index) => (
          <li key={step.title}>
            <a
              href={`#recorrido-${index + 1}`}
              aria-label={`${index + 1}. ${step.title}`}
              aria-current={active === index ? 'step' : undefined}
              data-complete={active !== null && index <= active}
              onClick={() => selectStage(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>{step.navLabel}
            </a>
          </li>
        ))}</ol>
      </nav>}
      <ol className={compact ? styles.journey : styles.story} aria-label={label} data-interactive={active !== null}>
      {steps.map((step, index) => (
        <li
          key={step.title}
          id={compact ? `recorrido-${index + 1}` : undefined}
          tabIndex={compact ? -1 : undefined}
          className={styles.step}
          data-phone={step.phone || undefined}
          data-story-step={index}
          data-current={active === index}
          onFocusCapture={() => activate(index)}
          onPointerMove={(event) => {
            if (event.pointerType === 'mouse' && activeIndex.current !== index) {
              requestedIndex.current = null;
              activate(index);
            }
          }}
        >
          <div className={styles.copy} data-story-copy>
            <p className={`eyebrow ${styles.number}`}>{String(index + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</p>
            <Heading>{step.title}</Heading>
            {step.content}
          </div>
          <div className={styles.visual} data-story-visual data-phone={step.phone || undefined} style={{ '--image-ratio': step.imageRatio } as CSSProperties}>
            {step.visual}
          </div>
        </li>
      ))}
      </ol>
    </div>
  )}</Localized>;
}

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

type TransactionState = { name: string; meaning: string; action: string; visual: ReactNode };

export function RedebanStates({ states }: { states: TransactionState[] }) {
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [selected, setSelected] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const panels = useRef<HTMLDivElement>(null);
  const id = useId();

  useLayoutEffect(() => {
    if (ready) playCaseMotion(panels.current?.querySelector('[data-selected="true"]') ?? null, 'panel');
  }, [ready, selected]);

  return <Localized>{(
    <div className={styles.states}>
      {ready && <div className={styles.stateControls} role="tablist" aria-label="Explorar un estado transaccional">
        {states.map((state, index) => (
          <button key={state.name} ref={(button) => { tabs.current[index] = button; }} type="button" role="tab" id={`${id}-tab-${index}`} aria-selected={selected === index} aria-controls={`${id}-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => {
            const destinations: Record<string, number> = {
              ArrowRight: (index + 1) % states.length,
              ArrowLeft: (index - 1 + states.length) % states.length,
              Home: 0,
              End: states.length - 1,
            };
            const nextIndex = destinations[event.key];
            if (nextIndex === undefined) return;
            event.preventDefault();
            setSelected(nextIndex);
            tabs.current[nextIndex]?.focus();
          }}>{state.name}</button>
        ))}
      </div>}
      <div ref={panels} className={styles.statePanels} data-ready={ready}>
      {states.map((state, index) => (
        <section key={state.name} id={`${id}-${index}`} role={ready ? 'tabpanel' : undefined} tabIndex={ready && selected === index ? 0 : undefined} aria-labelledby={ready ? `${id}-tab-${index}` : `${id}-title-${index}`} aria-hidden={ready && selected !== index ? true : undefined} inert={ready && selected !== index} data-selected={selected === index} className={styles.statePanel}>
          <div>
            <p className="eyebrow">Estado transaccional</p>
            <h4 id={`${id}-title-${index}`}>{state.name}</h4>
            <dl>
              <div><dt>Qué debe comprender el usuario</dt><dd>{state.meaning}</dd></div>
              <div><dt>Qué sigue</dt><dd>{state.action}</dd></div>
            </dl>
          </div>
          <div className={styles.stateVisual}>{state.visual}</div>
        </section>
      ))}
      </div>
    </div>
  )}</Localized>;
}
