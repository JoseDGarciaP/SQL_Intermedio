import { Navigate, useParams } from 'react-router-dom';
import { Page, ListItem, Section, Note, SchemaFigure, Pager } from '../components/Shell.jsx';
import SqlCode from '../components/SqlCode.jsx';
import SqlBlock from '../components/SqlBlock.jsx';
import { AGREGADOS } from '../data/content.js';

export function AgregadosList() {
  return (
    <Page title="Funciones Agregadas">
      <p className="lead">{AGREGADOS.intro}</p>
      <ul className="items">
        {AGREGADOS.items.map((a) => (
          <ListItem key={a.id} to={`/agregados/${a.id}`} icon={a.icon} title={a.title} desc={a.short} />
        ))}
      </ul>
    </Page>
  );
}

export function AgregadoDetail() {
  const { id } = useParams();
  const idx = AGREGADOS.items.findIndex((a) => a.id === id);
  if (idx < 0) return <Navigate to="/agregados" replace />;
  const a = AGREGADOS.items[idx];
  const prev = AGREGADOS.items[idx - 1];
  const next = AGREGADOS.items[idx + 1];

  return (
    <Page title={a.title} back="/agregados">
      <div className="hero-topic">
        <img src={a.icon} alt="" width="48" height="48" />
        <p>{a.desc}</p>
      </div>

      <Section title="Sintaxis">
        <SqlCode sql={a.syntax} className="code-syntax" />
      </Section>

      <Section title="Tabla del ejemplo">
        <p>{AGREGADOS.context}</p>
        <SchemaFigure schema={AGREGADOS.schema} />
      </Section>

      {a.queries.map((q, i) => (
        <Section key={i} title={a.queries.length > 1 ? `Consulta ${i + 1}` : 'Consulta'} className="query">
          <p>{q.q}</p>
          <SqlBlock sql={q.sql} />
          <Note>{q.note}</Note>
        </Section>
      ))}

      <Pager
        prev={prev && { to: `/agregados/${prev.id}`, label: prev.title }}
        next={next && { to: `/agregados/${next.id}`, label: next.title }}
      />
    </Page>
  );
}
