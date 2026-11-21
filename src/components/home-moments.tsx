import Image from 'next/image';
import { Localized } from '@/i18n/server-localized';
import { homePhotos } from '@/data/home-photos';
import { HomeAboutReveal } from './home-about-reveal';
import styles from './home-moments.module.css';

const moments=[
  {photo:homePhotos.industrial,title:'Diseño Industrial · UPTC, 2023',caption:'Un logro que compartí con mi familia y el comienzo de una mirada más amplia sobre el diseño.',alt:'Graduación de Iván en Diseño Industrial, UPTC, 2023, acompañado por su familia.'},
  {photo:homePhotos.marketing,title:'Alta Gerencia en Mercadotecnia · UPTC, 2024',caption:'Una etapa para fortalecer mi comprensión de la estrategia, el negocio y la conexión con las personas.',alt:'Graduación de Iván de la especialización en Alta Gerencia en Mercadotecnia, UPTC, 2024.'},
  {photo:homePhotos.collaboration,title:'Aprender y construir en equipo',caption:'El recuerdo de uno de nuestros últimos retos universitarios: un proyecto exigente que nos permitió aprender, colaborar y destacar como equipo.',alt:'Iván y sus compañeros frente a un tablero de ideas durante una de sus últimas clases universitarias.'},
];

export function HomeMoments() {
  return <Localized><section className={`shell ${styles.section}`} aria-labelledby="home-moments-title" data-home-moments>
    <header className={styles.intro}><h2 id="home-moments-title">Momentos que construyeron mi camino.</h2><p>Mi recorrido también se ha construido entre aprendizajes, desafíos compartidos y personas que han acompañado cada etapa. Estos son algunos de los momentos que ayudaron a definir mi manera de pensar y diseñar.</p></header>
    <HomeAboutReveal className={styles.grid}>{moments.map(({photo,title,caption,alt})=><figure key={photo.src} className={styles.figure} data-about-reveal>
      <div className={styles.image}><Image src={photo.src} width={photo.width} height={photo.height} alt={alt} sizes={photo===homePhotos.collaboration?"(max-width:650px) 90vw, (max-width:900px) 36vw, 470px":"(max-width:650px) 45vw, (max-width:900px) 28vw, 380px"} loading="lazy"/></div>
      <figcaption><h3>{title}</h3><p>{caption}</p></figcaption>
    </figure>)}</HomeAboutReveal>
  </section></Localized>;
}
