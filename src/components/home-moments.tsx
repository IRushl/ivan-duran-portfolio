import Image from 'next/image';
import { Localized } from '@/i18n/server-localized';
import { homePhotos } from '@/data/home-photos';
import { ScrollNarrative } from './home-scroll-narrative';
import styles from './home-moments.module.css';

const moments=[
  {photo:homePhotos.industrial,label:'Diseño Industrial · UPTC, 2023',title:'El diseño fue mi punto de partida.',caption:'Mi formación en Diseño Industrial me enseñó a observar las necesidades de las personas, cuestionar cómo funcionan las cosas y transformar ideas en soluciones. Graduarme de la UPTC en 2023 fue un logro que compartí con mi familia y el comienzo de una nueva etapa.',alt:'Graduación de Iván en Diseño Industrial, UPTC, 2023, acompañado por su familia.'},
  {photo:homePhotos.marketing,label:'Alta Gerencia en Mercadotecnia · UPTC, 2024',title:'Después aprendí a mirar más allá del diseño.',caption:'Comprendí que una solución no depende únicamente de cómo funciona o cómo se ve. También necesita conectar con objetivos, estrategias y decisiones de negocio. La especialización en Alta Gerencia en Mercadotecnia, culminada en 2024, amplió mi perspectiva profesional.',alt:'Graduación de Iván de la especialización en Alta Gerencia en Mercadotecnia, UPTC, 2024.'},
  {photo:homePhotos.collaboration,label:'Colaboración universitaria',title:'Y descubrí cuánto se aprende construyendo en equipo.',caption:'Esta fotografía me recuerda uno de los retos más exigentes y satisfactorios de mi etapa universitaria. Fue un proyecto que nos puso a prueba y en el que logramos destacarnos trabajando juntos. Me dejó aprendizajes sobre colaboración, decisiones y la importancia de afrontar desafíos desde diferentes perspectivas.',alt:'Iván y sus compañeros frente a un tablero de ideas durante una de sus últimas clases universitarias.'},
];

export function HomeMoments() {
  return <ScrollNarrative id="momentos" labelledBy="home-moments-title" className={`shell ${styles.section}`}><Localized>
    <div className={styles.frame} data-story-frame>
      <header className={styles.intro}><h2 id="home-moments-title">Momentos que construyeron mi camino.</h2><span className={styles.counter} aria-hidden="true"><span data-story-counter>01</span><span> / 03</span></span></header>
      <div className={styles.grid}>{moments.map(({photo,title,label,caption,alt},index)=><figure key={photo.src} className={styles.figure} data-story-panel>
        <div className={styles.image}><Image src={photo.src} width={photo.width} height={photo.height} alt={alt} sizes="(max-width:650px) 90vw, (max-width:999px) 44vw, 520px" loading="lazy"/></div>
        <figcaption><p className={styles.label}>{String(index+1).padStart(2,'0')} / {label}</p><h3>{title}</h3><p>{caption}</p></figcaption>
      </figure>)}</div>
    </div>
  </Localized></ScrollNarrative>;
}
