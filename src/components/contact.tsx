import { ArrowUpRight, AtSign, Github, Linkedin } from 'lucide-react';
import { profile } from '@/data/profile';
import { SectionLabel } from './site-shell';

const { email, linkedin, github } = profile.contact;
const channels = [
  { label: 'Correo', href: email ? `mailto:${email}` : '', icon: AtSign },
  { label: 'LinkedIn', href: linkedin, icon: Linkedin },
  { label: 'GitHub', href: github, icon: Github },
];
const primary = channels.find(({ href }) => href);

export function Contact() {
  return (
    <section className="contact-section" id="contacto" tabIndex={-1} aria-labelledby="contact-title">
      <div className="shell contact-inner">
        <div>
          <SectionLabel index="04">Contacto</SectionLabel>
          <h2 className="section-heading" id="contact-title">Hablemos de tu próximo producto<span>.</span></h2>
          <p>Me interesa conversar sobre oportunidades en Product Design y UX/UI.</p>
          {primary && <a className="button button-primary contact-cta" href={primary.href}>Contactar <ArrowUpRight size={18} aria-hidden="true" /></a>}
        </div>
        <ul className="channel-list" aria-label="Canales de contacto">
          {channels.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              {href ? (
                <a className="channel-row" href={href}><Icon size={18} aria-hidden="true" />{label}<ArrowUpRight className="channel-end" size={18} aria-hidden="true" /></a>
              ) : (
                <span className="channel-row"><Icon size={18} aria-hidden="true" />{label}<span className="eyebrow channel-end">Por configurar</span></span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
