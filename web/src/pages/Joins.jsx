import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Page, ListItem, Section, Note, SchemaFigure, Pager } from '../components/Shell.jsx';
import Venn from '../components/Venn.jsx';
import SqlCode from '../components/SqlCode.jsx';
import SqlBlock from '../components/SqlBlock.jsx';
import { JOINS } from '../data/content.js';

export function JoinsList() {
  const [sel, setSel] = useState('inner');
  const current = JOINS.items.find((j) => j.id === sel);

  return (
    <Page title="Joins">
      <p className="lead">{JOINS.intro}</p>

      <section className="venn-explorer" aria-label="Compara los tipos de JOIN">
        <div className="venn-explorer-figure">
          <Venn type={sel} size="lg" labels={['A', 'B']} sublabels={['estudiante', 'curso']} />
        </div>
        <div className="venn-explorer-body">
          <div className="segmented" role="radiogroup" aria-label="Tipo de JOIN">
            {JOINS.items.map((j) => (
              <button key={j.id} type="button" role="radio" aria-checked={sel === j.id}
                className={sel === j.id ? 'is-on' : ''} onClick={() => setSel(j.id)}>
                {j.title.replace(' con Exclusión', ' excl.')}
              </button>
            ))}
          </div>
          <p className="venn-explorer-desc">{current.short}</p>
          <Link className="text-link" to={`/joins/${current.id}`}>
            Ver {current.title} con su ejemplo <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <ul className="items">
        {JOINS.items.map((j) => (
          <ListItem key={j.id} to={`/joins/${j.id}`} visual={<Venn type={j.id} size="xs" labels={['', '']} />} title={j.title} desc={j.short} />
        ))}
      </ul>
    </Page>
  );
}

export function JoinDetail() {
  const { id } = useParams();
  const idx = JOINS.items.findIndex((j) => j.id === id);
  if (idx < 0) return <Navigate to="/joins" replace />;
  const j = JOINS.items[idx];
  const prev = JOINS.items[idx - 1];
  const next = JOINS.items[idx + 1];

  return (
    <Page title={j.title} back="/joins">
      <div className="hero-join">
        <Venn type={j.id} size="md" sublabels={['estudiante', 'curso']} />
        <p>{j.desc}</p>
      </div>

      <Section title="Sintaxis">
        <SqlCode sql={j.syntax} className="code-syntax" />
      </Section>

      <Section title="Tablas del ejemplo">
        <SchemaFigure schema={JOINS.schema} />
      </Section>

      <Section title="Ejemplo">
        <p>{j.example}</p>
        <SqlBlock sql={j.sql} />
        <Note>{j.note}</Note>
      </Section>

      <Pager
        prev={prev && { to: `/joins/${prev.id}`, label: prev.title }}
        next={next && { to: `/joins/${next.id}`, label: next.title }}
      />
    </Page>
  );
}
