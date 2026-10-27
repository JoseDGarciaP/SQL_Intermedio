import { useCallback, useState } from 'react';
import { Play, RotateCcw, Database } from 'lucide-react';
import { Page } from '../components/Shell.jsx';
import SqlEditor from '../components/LazySqlEditor.jsx';
import QueryOutput from '../components/QueryOutput.jsx';
import { run, resetDb } from '../lib/db.js';
import { TABLES } from '../data/seed.js';

const START = '-- Escribe una consulta y pulsa Ejecutar (o Ctrl + Enter)\nSELECT *\nFROM escuela.estudiante;';
const KEY = 'sqli-editor';

export default function Editor() {
  const [code, setCode] = useState(() => {
    try { return localStorage.getItem(KEY) || START; } catch { return START; }
  });
  const [state, setState] = useState({ status: 'idle' });
  const [resetMsg, setResetMsg] = useState('');

  const save = (v) => {
    setCode(v);
    try { localStorage.setItem(KEY, v); } catch { /* sin almacenamiento */ }
  };

  const exec = useCallback(async (text) => {
    if (typeof text !== 'string') text = code;
    setState({ status: 'running' });
    try { setState({ status: 'done', ...(await run(text)) }); }
    catch (error) { setState({ status: 'error', error }); }
  }, [code]);

  const preview = (full) => {
    const q = `SELECT *\nFROM ${full};`;
    save(q);
    exec(q);
  };

  const reset = async () => {
    setResetMsg('Restaurando…');
    await resetDb();
    setResetMsg('Datos restaurados a su estado original.');
    setTimeout(() => setResetMsg(''), 2500);
  };

  return (
    <Page title="Editor SQL" wide>
      <p className="lead">
        Practica con las mismas bases de datos de la aplicación. Puedes consultar, insertar o borrar datos:
        los cambios solo existen en tu navegador y se pueden restaurar cuando quieras.
      </p>

      <div className="editor-layout">
        <div className="editor-main">
          <SqlEditor value={code} onChange={save} onRun={(t) => exec(t)} minHeight="200px" />
          <div className="sqlblock-actions">
            <button type="button" className="btn btn-run" onClick={() => exec()} disabled={state.status === 'running'}>
              <Play size={16} fill="currentColor" /> {state.status === 'running' ? 'Ejecutando…' : 'Ejecutar'}
            </button>
            <span className="kbd-hint">Ctrl + Enter</span>
          </div>
          <QueryOutput state={state} title="Resultado" />
        </div>

        <aside className="editor-side" aria-label="Tablas disponibles">
          <h2 className="section-title"><Database size={18} aria-hidden="true" /> Tablas</h2>
          <p className="hint">Toca una tabla para ver su contenido.</p>
          {TABLES.map((s) => (
            <div key={s.schema} className="schema-group">
              <h3>{s.schema}</h3>
              <div className="chips">
                {s.tables.map((t) => (
                  <button key={t} type="button" className="chip" onClick={() => preview(`${s.schema}.${t}`)}>{t}</button>
                ))}
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
            <RotateCcw size={16} /> Restaurar datos originales
          </button>
          {resetMsg && <p className="hint" role="status">{resetMsg}</p>}
        </aside>
      </div>
    </Page>
  );
}
