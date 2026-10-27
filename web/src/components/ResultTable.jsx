// int2, int4, int8, float4, float8, numeric
const NUMERIC_TYPES = new Set([20, 21, 23, 700, 701, 1700]);

function formatCell(v, typeId) {
  if (v === null || v === undefined) return { text: 'NULL', cls: 'is-null' };
  if (v instanceof Date) {
    const d = String(v.getUTCDate()).padStart(2, '0');
    const m = String(v.getUTCMonth() + 1).padStart(2, '0');
    return { text: `${d}/${m}/${v.getUTCFullYear()}`, cls: '' };
  }
  if (typeof v === 'number' || typeof v === 'bigint') return { text: String(v), cls: 'is-num' };
  if (NUMERIC_TYPES.has(typeId)) return { text: String(v), cls: 'is-num' };
  if (typeof v === 'boolean') return { text: v ? 'true' : 'false', cls: '' };
  if (typeof v === 'object') return { text: JSON.stringify(v), cls: '' };
  return { text: String(v), cls: '' };
}

/** Tabla de resultados con el estilo de los diagramas del curso: franja naranja con nombre y filas durazno. */
export default function ResultTable({ fields, types = [], rows, title = 'Resultado', ms }) {
  const count = rows.length;
  return (
    <figure className="dbtable">
      <figcaption className="dbtable-head">
        <span className="dbtable-name">{title}</span>
        <span className="dbtable-meta">
          {count === 1 ? '1 fila' : `${count} filas`}
          {ms != null && <> en {ms < 1 ? '<1' : Math.round(ms)} ms</>}
        </span>
      </figcaption>
      {fields.length === 0 ? (
        <p className="dbtable-empty">La sentencia se ejecutó y no devuelve columnas.</p>
      ) : (
        <div className="dbtable-scroll">
          <table>
            <thead>
              <tr>{fields.map((f, i) => <th key={i} scope="col">{f}</th>)}</tr>
            </thead>
            <tbody>
              {count === 0 ? (
                <tr><td colSpan={fields.length} className="is-empty">Sin filas: ninguna fila cumple la condición.</td></tr>
              ) : rows.map((r, i) => (
                <tr key={i}>
                  {fields.map((f, j) => {
                    const { text, cls } = formatCell(r[j], types[j]);
                    return <td key={j} className={cls}>{text}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </figure>
  );
}
