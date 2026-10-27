import { Link } from 'react-router-dom';
import { SquareTerminal, Info } from 'lucide-react';
import { Page, ListItem, GithubIcon } from '../components/Shell.jsx';
import { APP, SECTIONS } from '../data/content.js';

export default function Home() {
  return (
    <Page title="SQL Intermedio" back={null}>
      <p className="lead">Elige un tema. Cada ejemplo se puede ejecutar y modificar sobre una base de datos PostgreSQL que corre en tu navegador.</p>
      <ul className="items">
        {SECTIONS.map((s) => (
          <ListItem key={s.id} to={`/${s.id}`} icon={s.icon} title={s.title} desc={s.desc} />
        ))}
      </ul>

      <div className="home-tools">
        <Link to="/editor" className="tool">
          <SquareTerminal size={22} aria-hidden="true" />
          <span><strong>Editor SQL</strong>Escribe tus propias consultas sobre las 4 bases de datos.</span>
        </Link>
        <a href={APP.repo} className="tool" target="_blank" rel="noreferrer">
          <GithubIcon size={22} />
          <span><strong>Repositorio</strong>Código SQL de los ejercicios en GitHub.</span>
        </a>
        <Link to="/acerca" className="tool">
          <Info size={22} aria-hidden="true" />
          <span><strong>Acerca de</strong>Propósito de la aplicación y origen de esta versión web.</span>
        </Link>
      </div>
    </Page>
  );
}
