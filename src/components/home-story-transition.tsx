import { Localized } from '@/i18n/server-localized';
import { ScrollNarrative } from './home-scroll-narrative';
import styles from './home-story.module.css';

export function StoryTransition({id,phrases}:{id:string;phrases:readonly string[]}) {
  return <ScrollNarrative id={id} labelledBy={`${id}-title`} className={styles.transition}><Localized>
    <h2 className="sr-only" id={`${id}-title`}>{phrases.map(phrase=><span key={phrase}>{phrase}{' '}</span>)}</h2>
    <div className={styles.frame} data-story-frame><div className={`shell ${styles.messages}`}>
      {phrases.map(phrase=><p key={phrase} className={styles.message} data-story-panel aria-hidden="true"><span>{phrase}</span></p>)}
    </div><div className={styles.depthLine} aria-hidden="true"/></div>
  </Localized></ScrollNarrative>;
}
