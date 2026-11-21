import { Localized } from '@/i18n/server-localized';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { homePhotos, type HomePhoto } from '@/data/home-photos';
import { InterestCards } from './immersive-home/interest-cards';
import home from './home.module.css';
import styles from './home-editorial.module.css';
import about from './home-about.module.css';
import { HomeAboutReveal } from './home-about-reveal';

function Photograph({ photo, children, className = '', sizes }: { photo: HomePhoto; children?: ReactNode; className?: string; sizes: string }) {
  return <Localized>{<figure className={`${styles.photograph} ${className}`}><Image src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} sizes={sizes}/>{children && <figcaption>{children}</figcaption>}</figure>}</Localized>;
}

export function HomePerspective() {
  return <Localized><section id="perfil" tabIndex={-1} className={`shell ${about.section}`} aria-labelledby="home-profile-title">
    <HomeAboutReveal>
      <figure className={about.portrait} data-about-reveal>
        <Image src="/about/ivan-duran-retrato.webp" width={1000} height={1000} alt="Retrato de Iván Durán con gafas doradas, editado digitalmente a partir de su imagen." sizes="(max-width:650px) 90vw, (max-width:1000px) 40vw, 470px" loading="lazy"/>
      </figure>
      <div className={about.copy} data-about-reveal>
        <p className={home.sectionLabel}>Sobre mí</p>
        <h2 id="home-profile-title">Diseño para las personas. Con mirada de producto.</h2>
        <div className={about.prose}>
          <p>Soy Iván Durán, diseñador industrial y especialista en Alta Gerencia en Mercadotecnia. Mi recorrido me ha permitido conectar el diseño, las necesidades de las personas y los objetivos de negocio desde distintas perspectivas.</p>
          <p>Hoy enfoco mi trabajo en UX/UI y diseño de producto, combinando investigación, diseño de interfaces y prototipado digital. Me entusiasma explorar nuevas tecnologías, incluida la inteligencia artificial, para transformar ideas en experiencias claras, útiles y bien pensadas.</p>
        </div>
        <p className={about.support}>Me mueve la curiosidad, el aprendizaje continuo y la posibilidad de crear soluciones que realmente aporten valor.</p>
        <ul className={about.tags} aria-label="Perspectivas que conecto"><li>Diseño.</li><li>Negocio.</li><li>Tecnología.</li></ul>
        <div className={about.education}><p>Diseño Industrial — UPTC, 2023.</p><p>Especialización en Alta Gerencia en Mercadotecnia — UPTC, 2024.</p></div>
        <a className={about.cta} href="#experiencia">Ver mi trayectoria.<span aria-hidden="true"> ↗</span></a>
      </div>
    </HomeAboutReveal>
  </section></Localized>;
}

export function HomePersonal() {
  return <Localized>{<section id="mas-alla" tabIndex={-1} className={`shell ${styles.personal}`} aria-labelledby="home-personal-title">
    <div className={styles.personalIntro}><div><p className={home.sectionLabel}>Más allá del diseño</p><h2 id="home-personal-title">Curiosidad, disciplina<br/>y <span>ganas de crear.</span></h2><p className={styles.personalLead}>Lo que hago fuera del trabajo también alimenta mi forma de pensar, aprender y diseñar.</p><p className={styles.prose}>Fuera de las interfaces, me interesan los videojuegos, el entrenamiento, la tecnología y el aprendizaje continuo. Esos intereses también influyen en mi forma de diseñar: me gusta explorar posibilidades, entender sistemas, iterar y encontrar mejores formas de hacer las cosas.</p></div><Photograph photo={homePhotos.personal} sizes="(max-width: 650px) 80vw, 350px" className={styles.personalPhoto}/></div>
    <InterestCards/>
  </section>}</Localized>;
}
