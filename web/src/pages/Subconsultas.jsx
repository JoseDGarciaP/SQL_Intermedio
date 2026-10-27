import { Page, Section, Note, SchemaFigure } from '../components/Shell.jsx';
import SqlCode from '../components/SqlCode.jsx';
import SqlBlock from '../components/SqlBlock.jsx';
import { SUBCONSULTAS } from '../data/content.js';

export default function Subconsultas() {
  return (
    <Page title="Subconsultas">
      <p className="lead">{SUBCONSULTAS.intro}</p>

      <Section title="Sintaxis">
        <SqlCode sql={SUBCONSULTAS.syntax} className="code-syntax" />
      </Section>

      <Section title="Reglas">
        <ol className="rules">
          {SUBCONSULTAS.rules.map((r, i) => <li key={i}>{r}</li>)}
        </ol>
      </Section>

      <Section title="Tabla de los ejemplos">
        <SchemaFigure schema={SUBCONSULTAS.schema} />
      </Section>

      {SUBCONSULTAS.items.map((s, i) => (
        <Section key={s.id} title={`${i + 1}. ${s.title}`} className="query">
          <p>{s.desc}</p>
          <SqlBlock sql={s.sql} />
          <Note>{s.note}</Note>
        </Section>
      ))}
    </Page>
  );
}
