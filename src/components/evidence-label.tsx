import { Localized } from '@/i18n/server-localized';
import styles from './evidence-label.module.css';

const labels = {
  brief: 'Dato inicial del brief',
  observed: 'Evidencia observada',
  target: 'Meta · objetivo proyectado',
  validated: 'Resultado validado',
};

export function EvidenceLabel({ kind, label }: { kind: keyof typeof labels; label?: string }) {
  return <Localized>{<span className={styles.label} data-evidence-kind={kind}>{label ?? labels[kind]}</span>}</Localized>;
}
