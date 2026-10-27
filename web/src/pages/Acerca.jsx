import { GithubIcon, Page, Section } from '../components/Shell.jsx';
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

      <Section title={ACERCA.web.title} className="about-web">
        <div className="prose">
          {ACERCA.web.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <ul className="links">
          <li><a href={APP.repo} target="_blank" rel="noreferrer"><GithubIcon size={18} /> Repositorio original</a></li>
        </ul>
      </Section>

      <p className="hint about-foot">{ACERCA.updated}</p>
    </Page>
  );
}
