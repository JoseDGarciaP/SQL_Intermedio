import { Mail, Globe } from 'lucide-react';
import { GithubIcon, Page } from '../components/Shell.jsx';
import { ACERCA, APP, img } from '../data/content.js';

export default function Acerca() {
  return (
    <Page title="Acerca de">
      <div className="about-head">
        <img src={img('sql2.png')} alt="" width="56" height="56" />
        <div>
          <h2>SQL Intermedio</h2>
          <p className="hint">Versión web {APP.version}</p>
        </div>
      </div>

      <div className="prose">
        {ACERCA.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="author">
        <p className="author-name">{ACERCA.author}</p>
        <p>{ACERCA.authorRole}</p>
        <ul className="links">
          <li><a href={`mailto:${ACERCA.contact}`}><Mail size={18} aria-hidden="true" /> {ACERCA.contact}</a></li>
          <li><a href={APP.repo} target="_blank" rel="noreferrer"><GithubIcon size={18} /> Repositorio del código SQL</a></li>
          <li><a href={APP.ufpso} target="_blank" rel="noreferrer"><Globe size={18} aria-hidden="true" /> ufpso.edu.co</a></li>
        </ul>
      </div>

      <p className="hint">{ACERCA.updated} Las consultas se ejecutan con PostgreSQL directamente en el navegador mediante PGlite.</p>
    </Page>
  );
}
