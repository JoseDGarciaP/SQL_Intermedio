import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import ResultTable from './ResultTable.jsx';
import { explainError, getStatus, onStatus } from '../lib/db.js';

export default function QueryOutput({ state, title }) {
  const [dbStatus, setDbStatus] = useState(getStatus());
  useEffect(() => onStatus(setDbStatus), []);

  if (state.status === 'idle') return null;

  if (state.status === 'running') {
    return (
      <div className="output-loading" role="status">
        <span className="spinner" aria-hidden="true" />
        {dbStatus === 'loading'
          ? 'Preparando PostgreSQL en tu navegador (solo la primera vez)…'
          : 'Ejecutando consulta…'}
      </div>
    );
  }

  if (state.status === 'error') {
    const { hint, raw } = explainError(state.error);
    const network = /fetch|network|Failed to load|import/i.test(raw);
    return (
      <div className="output-error" role="alert">
        <AlertTriangle size={18} aria-hidden="true" />
        <div>
          <strong>{network ? 'No se pudo cargar la base de datos.' : (hint || 'La consulta tiene un error.')}</strong>
          <p>{network ? 'Revisa tu conexión a internet y vuelve a ejecutar.' : raw}</p>
        </div>
      </div>
    );
  }

  const { results, ms } = state;
  const shown = results.filter((r) => r.fields.length > 0);
  const last = results[results.length - 1];

  return (
    <div className="output" aria-live="polite">
      {shown.map((r, i) => (
        <ResultTable key={i} fields={r.fields} types={r.types} rows={r.rows} title={shown.length > 1 ? `${title} ${i + 1}` : title} ms={i === shown.length - 1 ? ms : null} />
      ))}
      {shown.length === 0 && (
        <p className="output-ok">
          Sentencia ejecutada{last?.affected != null ? `: ${last.affected} ${last.affected === 1 ? 'fila afectada' : 'filas afectadas'}` : ''}.
        </p>
      )}
    </div>
  );
}
