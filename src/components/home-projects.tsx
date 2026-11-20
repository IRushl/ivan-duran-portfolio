import { Localized } from '@/i18n/server-localized';
import { HomeProjectGallery } from './home-project-gallery';
import styles from './home-projects.module.css';

export function HomeProjects() {
  return <Localized>{<div id="proyectos" tabIndex={-1} className={styles.exhibition} data-home-exhibition><HomeProjectGallery/></div>}</Localized>;
}
