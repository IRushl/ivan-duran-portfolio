import { Localized } from '@/i18n/server-localized';
import { HomeContact } from './home-contact';
import { HomeProjects } from './home-projects';
import { HomeNavigation } from './home-navigation';
import { HomeTimeline } from './home-timeline';
import { HomePerspective, HomePersonal } from './home-editorial';
import { HomeMoments } from './home-moments';
import { StoryTransition } from './home-story-transition';
import { homeContact } from '@/data/home';
import { ImmersiveHome } from './immersive-home/immersive-home';
import { CapabilityCards } from './immersive-home/capability-cards';
import styles from './home.module.css';

export function HomeView() {
  const hero = <section className={styles.hero} data-home-hero aria-labelledby="home-hero-title"><div className={`shell ${styles.heroInner}`}>
    <div className={styles.identity}><p>Iván Durán</p><span>Product Designer / UX/UI &amp; Digital Experiences</span></div>
    <h1 id="home-hero-title">De la complejidad a<br/>{' '}experiencias <span>que se entienden.</span></h1>
    <p className={styles.heroLead}>Conecto investigación UX, diseño de interfaces y prototipado digital para transformar necesidades de usuarios y negocio en experiencias claras, útiles y consistentes.</p>
    <div className={styles.heroActions}><a className={styles.primary} href="#proyectos">Explorar proyectos</a><a className={styles.secondary} href={homeContact.cv.href} download="Ivan-Duran-CV-2026.pdf">Descargar CV <span>PDF</span></a></div>
    <div className={styles.heroBottom}><p>Diseño centrado en personas.<br/><span>Experiencias impulsadas por tecnología.</span></p><p>Investigación · Diseño de interfaces · Prototipado</p></div>
  </div></section>;
  return <Localized>{<main id="contenido" tabIndex={-1} className={styles.home}><HomeNavigation/><ImmersiveHome hero={hero}><StoryTransition id="historia-perspectiva" phrases={['Detrás de cada interfaz…','Hay una forma de mirar el mundo.','La mía comenzó mucho antes de diseñar pantallas.']}/><HomePerspective/><StoryTransition id="historia-proyectos" phrases={['Entender es el comienzo.','Diseñar es convertir esa comprensión en decisiones.']}/><HomeProjects/><StoryTransition id="historia-experiencia" phrases={['Cada proyecto plantea un desafío diferente.','La experiencia se construye enfrentándolos.']}/><HomeTimeline/><HomeMoments/><StoryTransition id="historia-capacidades" phrases={['Lo aprendido se transforma en una forma de pensar.','Y esa forma de pensar define cómo diseño.']}/><CapabilityCards/><StoryTransition id="historia-curiosidad" phrases={['Pero la curiosidad no termina en el trabajo.','También vive en todo lo que me apasiona.']}/><HomePersonal/><StoryTransition id="historia-conversacion" phrases={['Las ideas crecen cuando se comparten.','Quizá la próxima comience con una conversación.']}/><HomeContact/></ImmersiveHome></main>}</Localized>;
}
