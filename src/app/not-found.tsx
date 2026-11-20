import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="contenido" className="shell not-found" tabIndex={-1}>
      <p className="eyebrow">Error 404</p>
      <h1 className="section-heading">Página no encontrada<span>.</span></h1>
      <Link className="back-link" href="/#proyectos"><ArrowLeft size={18} aria-hidden="true" /> Ver proyectos</Link>
    </main>
  );
}
