import { Localized } from '@/i18n/server-localized';
import { Mail, Linkedin, Phone, FileUser, Github } from 'lucide-react';
import { homeContact } from '@/data/home';
import styles from './home.module.css';

export function HomeContact() {
  return <Localized>{<section id="contacto" tabIndex={-1} className={styles.contact} aria-labelledby="home-contact-title"><div className={`shell ${styles.contactInner}`}><div><p className={styles.sectionLabel}>Conversemos</p><h2 id="home-contact-title">¿Tu próximo reto<br/>necesita <span>otra mirada?</span></h2><p className={styles.contactLead}>Me interesa conversar sobre oportunidades en Product Design y UX/UI, y sobre productos que necesiten una experiencia más clara.</p><p className={styles.location}>Tunja, Boyacá, Colombia · Disponible para proyectos remotos e híbridos</p></div><address className={styles.contactLinks}>
    <a href={`mailto:${homeContact.email}`}><span><Mail aria-hidden="true"/>Correo</span><strong>{homeContact.email}</strong></a>
    <a href={homeContact.linkedin} target="_blank" rel="noopener noreferrer"><span><Linkedin aria-hidden="true"/>LinkedIn</span><strong>Conectar en LinkedIn</strong><span className="sr-only"> (abre en una pestaña nueva)</span></a>
    <div className={styles.phones}><span><Phone aria-hidden="true"/>Teléfono</span><div>{homeContact.phones.map(phone=><a key={phone.href} href={phone.href}>{phone.label}</a>)}</div></div>
    {homeContact.github&&<a href={homeContact.github} target="_blank" rel="noopener noreferrer"><span><Github aria-hidden="true"/>GitHub</span><strong>Ver proyectos en GitHub</strong><span className="sr-only"> (abre en una pestaña nueva)</span></a>}
    <a href={homeContact.cv.href} download="Ivan-Duran-CV-2026.pdf"><span><FileUser aria-hidden="true"/>Trayectoria</span><strong>{homeContact.cv.label}</strong><small>{homeContact.cv.detail}</small></a>
  </address></div></section>}</Localized>;
}
