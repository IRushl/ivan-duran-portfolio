import { Localized } from '@/i18n/server-localized';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { homePhotos, type HomePhoto } from '@/data/home-photos';
import { InterestCards } from './immersive-home/interest-cards';
import home from './home.module.css';
import styles from './home-editorial.module.css';

function Photograph({ photo, children, className = '', sizes }: { photo: HomePhoto; children?: ReactNode; className?: string; sizes: string }) {
  return <Localized>{<figure className={`${styles.photograph} ${className}`}><Image src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} sizes={sizes}/>{children && <figcaption>{children}</figcaption>}</figure>}</Localized>;
}

export function HomePerspective() {
  return <Localized>{<section id="perfil" tabIndex={-1} className={`shell ${styles.perspective}`} aria-labelledby="home-profile-title">
    <div className={styles.perspectiveIntro}><div><p className={home.sectionLabel}>Mi perspectiva</p><h2 id="home-profile-title">Diseño para las personas.<br/><span>Con mirada de producto.</span></h2></div><div className={styles.prose}><p>Vengo del Diseño Industrial, donde aprendí a entender cómo las personas usan lo que diseñamos. Más adelante amplié esa base con una especialización en mercadotecnia, lo que fortaleció mi lectura de negocio.</p><p>Hoy conecto investigación, interfaces y prototipos digitales para construir productos más claros, útiles y consistentes. Me interesa trabajar en la intersección entre diseño, producto y tecnología, incluida la IA, siempre con criterio y foco en la experiencia.</p></div></div>
    <div id="formacion" tabIndex={-1} className={styles.formation}><div className={styles.formationCopy}><h3>Formación que<br/><span>amplió mi mirada.</span></h3><p>Mi recorrido parte del diseño, se fortalece con la estrategia y sigue creciendo en lo digital. Estas etapas no solo representan títulos: explican cómo fui construyendo una mirada más integral sobre experiencia, negocio y producto.</p></div><div className={styles.academicPhotos}>
      <Photograph photo={homePhotos.industrial} sizes="(max-width: 650px) 44vw, (max-width: 900px) 40vw, 260px"><h4>Diseño Industrial</h4><p>UPTC · 2023</p></Photograph>
      <Photograph photo={homePhotos.marketing} sizes="(max-width: 650px) 44vw, (max-width: 900px) 40vw, 260px"><h4>Alta Gerencia en Mercadotecnia</h4><p>UPTC · 2024</p></Photograph>
    </div></div>
    <div id="colaboracion" tabIndex={-1} className={styles.collaboration}><Photograph photo={homePhotos.collaboration} sizes="(max-width: 850px) 90vw, 45vw"/><div><p className={home.sectionLabel}>Ideas que se construyen en equipo</p><h3>Colaboración<br/><span>y aprendizaje.</span></h3><p>Disfruto los contextos donde las ideas se construyen en equipo. Muchas de las experiencias más retadoras también fueron las que más me enseñaron sobre criterio, colaboración y resolución de problemas.</p></div></div>
  </section>}</Localized>;
}

export function HomePersonal() {
  return <Localized>{<section id="mas-alla" tabIndex={-1} className={`shell ${styles.personal}`} aria-labelledby="home-personal-title">
    <div className={styles.personalIntro}><div><p className={home.sectionLabel}>Más allá del diseño</p><h2 id="home-personal-title">Curiosidad, disciplina<br/>y <span>ganas de crear.</span></h2><p className={styles.personalLead}>Lo que hago fuera del trabajo también alimenta mi forma de pensar, aprender y diseñar.</p><p className={styles.prose}>Fuera de las interfaces, me interesan los videojuegos, el entrenamiento, la tecnología y el aprendizaje continuo. Esos intereses también influyen en mi forma de diseñar: me gusta explorar posibilidades, entender sistemas, iterar y encontrar mejores formas de hacer las cosas.</p></div><Photograph photo={homePhotos.personal} sizes="(max-width: 650px) 80vw, 350px" className={styles.personalPhoto}/></div>
    <InterestCards/>
  </section>}</Localized>;
}
