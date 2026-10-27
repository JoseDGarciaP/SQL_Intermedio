import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Eye, EyeOff, ExternalLink } from 'lucide-react';
import { Page, ListItem, Section, Note, SchemaFigure, Pager } from '../components/Shell.jsx';
import SqlBlock from '../components/SqlBlock.jsx';
import SqlEditor from '../components/LazySqlEditor.jsx';
import QueryOutput from '../components/QueryOutput.jsx';
import { run } from '../lib/db.js';
import { APP, EJERCICIOS } from '../data/content.js';

function Topics({ text }) {
  return (
    <span className="topics">
      {text.split(' · ').map((t) => <span key={t} className="topic">{t}</span>)}
    </span>
  );
}

export function EjerciciosList() {
  return (
    <Page title="Ejercicios">
      <p className="lead">{EJERCICIOS.intro} {EJERCICIOS.context}</p>
      <SchemaFigure schema={EJERCICIOS.schema} />
      <ul className="items items-numbered">
        {EJERCICIOS.items.map((e) => (
          <ListItem key={e.n} to={`/ejercicios/${e.n}`} badge={e.n} title={e.title}>
            <Topics text={e.topics} />
          </ListItem>
        ))}
      </ul>
      <p className="repo-link">
        <a href={APP.repo} target="_blank" rel="noreferrer">
          Repositorio de código SQL de los ejercicios <ExternalLink size={14} aria-hidden="true" />
        </a>
      </p>
    </Page>
  );
}

/** Espacio para que el estudiante intente resolver antes de ver la solución. */
function Practice({ storageKey }) {
  const [code, setCode] = useState(() => {
    try { return localStorage.getItem(storageKey) || '-- Escribe aquí tu solución\nSELECT '; } catch { return 'SELECT '; }
  });
  const [state, setState] = useState({ status: 'idle' });

  const save = (v) => {
    setCode(v);
    try { localStorage.setItem(storageKey, v); } catch { /* sin almacenamiento */ }
  };
  const exec = async () => {
    setState({ status: 'running' });
    try { setState({ status: 'done', ...(await run(code)) }); }
    catch (error) { setState({ status: 'error', error }); }
  };

  return (
    <div className="practice">
      <SqlEditor value={code} onChange={save} onRun={exec} minHeight="120px" label="Tu solución" />
      <div className="sqlblock-actions">
        <button type="button" className="btn btn-run" onClick={exec} disabled={state.status === 'running'}>
          {state.status === 'running' ? 'Ejecutando…' : 'Probar mi consulta'}
        </button>
        <span className="kbd-hint">Ctrl + Enter para ejecutar</span>
      </div>
      <QueryOutput state={state} title="Tu resultado" />
    </div>
  );
}

export function EjercicioDetail() {
  const { n } = useParams();
  const idx = EJERCICIOS.items.findIndex((e) => String(e.n) === n);
  const [show, setShow] = useState(false);
  if (idx < 0) return <Navigate to="/ejercicios" replace />;
  const e = EJERCICIOS.items[idx];
  const prev = EJERCICIOS.items[idx - 1];
  const next = EJERCICIOS.items[idx + 1];

  return (
    <Page title={`Ejercicio ${e.n}`} back="/ejercicios">
      <div className="exercise-head">
        <span className="exercise-num" aria-hidden="true">{e.n}</span>
        <div>
          <h2>{e.title}</h2>
          <Topics text={e.topics} />
        </div>
      </div>
      <p className="exercise-q">{e.q}</p>

      <details className="schema-toggle">
        <summary>Ver las tablas de la BD supermarket</summary>
        <SchemaFigure schema={EJERCICIOS.schema} />
      </details>

      <Section title="Intenta resolverlo">
        <Practice key={e.n} storageKey={`sqli-ej-${e.n}`} />
      </Section>

      <Section title="Solución" className="solution">
        {!show ? (
          <button type="button" className="btn btn-outline" onClick={() => setShow(true)}>
            <Eye size={18} /> Ver solución
          </button>
        ) : (
          <>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShow(false)}>
              <EyeOff size={16} /> Ocultar solución
            </button>
            <SqlBlock key={`s${e.n}`} sql={e.sql} resultTitle="Resultado esperado" />
            {e.alt && (
              <div className="alt">
                <h3>{e.alt.label}</h3>
                <SqlBlock key={`a${e.n}`} sql={e.alt.sql} resultTitle="Resultado" />
              </div>
            )}
            <Note>
              {e.note}
              {e.link && <> <a href={e.link.href} target="_blank" rel="noreferrer">{e.link.label}</a>.</>}
            </Note>
          </>
        )}
      </Section>

      <Pager
        prev={prev && { to: `/ejercicios/${prev.n}`, label: `${prev.n}. ${prev.title}` }}
        next={next && { to: `/ejercicios/${next.n}`, label: `${next.n}. ${next.title}` }}
      />
    </Page>
  );
}
