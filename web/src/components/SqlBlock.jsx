import { useCallback, useState } from 'react';
import { Play, Pencil, RotateCcw, Copy, Check } from 'lucide-react';
import SqlCode from './SqlCode.jsx';
import QueryOutput from './QueryOutput.jsx';
import { run } from '../lib/db.js';

import SqlEditor from './LazySqlEditor.jsx';

/**
 * Bloque de consulta: muestra el SQL, permite ejecutarlo contra la BD del navegador
 * y editarlo para experimentar sin perder la versión original.
 */
export default function SqlBlock({ sql: original, resultTitle = 'Resultado' }) {
  const [code, setCode] = useState(original);
  const [editing, setEditing] = useState(false);
  const [state, setState] = useState({ status: 'idle' });
  const [copied, setCopied] = useState(false);

  const execute = useCallback(async (text) => {
    setState({ status: 'running' });
    try {
      const out = await run(text);
      setState({ status: 'done', ...out });
    } catch (err) {
      setState({ status: 'error', error: err });
    }
  }, []);

  const onRun = useCallback((text) => execute(typeof text === 'string' ? text : code), [code, execute]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* sin permiso de portapapeles */ }
  };

  const modified = code !== original;

  return (
    <div className="sqlblock">
      <div className="sqlblock-code">
        {editing ? (
          <SqlEditor value={code} onChange={setCode} onRun={onRun} autoFocus />
        ) : (
          <SqlCode sql={code} />
        )}
      </div>

      <div className="sqlblock-actions">
        <button type="button" className="btn btn-run" onClick={() => onRun()} disabled={state.status === 'running'}>
          <Play size={16} fill="currentColor" />
          {state.status === 'running' ? 'Ejecutando…' : 'Ejecutar'}
        </button>
        {!editing && (
          <button type="button" className="btn btn-ghost" onClick={() => setEditing(true)}>
            <Pencil size={16} /> Editar
          </button>
        )}
        {modified && (
          <button type="button" className="btn btn-ghost" onClick={() => { setCode(original); setState({ status: 'idle' }); }}>
            <RotateCcw size={16} /> Restaurar original
          </button>
        )}
        <button type="button" className="btn btn-ghost btn-icon" onClick={copy} aria-label={copied ? 'Consulta copiada' : 'Copiar consulta'} title="Copiar">
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        {editing && <span className="kbd-hint">Ctrl + Enter para ejecutar</span>}
      </div>

      <QueryOutput state={state} title={resultTitle} />
    </div>
  );
}

