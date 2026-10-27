// PostgreSQL dentro del navegador (PGlite, compilado a WebAssembly).
// Se carga solo la primera vez que alguien ejecuta una consulta.
import { SEED_SQL } from '../data/seed.js';

let dbPromise = null;
const listeners = new Set();
let status = 'idle'; // idle | loading | ready | error

function setStatus(s) {
  status = s;
  listeners.forEach((fn) => fn(s));
}

export function getStatus() { return status; }
export function onStatus(fn) { listeners.add(fn); return () => listeners.delete(fn); }

async function create() {
  setStatus('loading');
  const { PGlite } = await import('@electric-sql/pglite');
  const db = new PGlite();
  await db.exec(SEED_SQL);
  setStatus('ready');
  return db;
}

export function getDb() {
  if (!dbPromise) {
    dbPromise = create().catch((err) => {
      dbPromise = null;
      setStatus('error');
      throw err;
    });
  }
  return dbPromise;
}

/** Vuelve a crear la base de datos con los datos originales. */
export async function resetDb() {
  if (dbPromise) {
    try { (await dbPromise).close(); } catch { /* ignorar */ }
  }
  dbPromise = null;
  return getDb();
}

/** Ejecuta una o varias sentencias. Devuelve un resultado por sentencia. */
export async function run(sql) {
  const db = await getDb();
  const t0 = performance.now();
  const results = await db.exec(sql, { rowMode: 'array' });
  const ms = performance.now() - t0;
  return {
    ms,
    results: results.map((r) => ({
      fields: (r.fields || []).map((f) => f.name),
      types: (r.fields || []).map((f) => f.dataTypeID),
      rows: r.rows || [],
      affected: r.affectedRows,
    })),
  };
}

/** Traduce los mensajes de error más comunes de PostgreSQL al español. */
export function explainError(err) {
  const msg = String(err?.message || err);
  const tips = [
    [/relation "([^"]+)" does not exist/, (m) => `La tabla "${m[1]}" no existe. Recuerda anteponer el esquema, por ejemplo: escuela.estudiante.`],
    [/column "([^"]+)" does not exist/, (m) => `La columna "${m[1]}" no existe en las tablas de la consulta.`],
    [/syntax error at or near "([^"]+)"/, (m) => `Error de sintaxis cerca de "${m[1]}".`],
    [/syntax error at end of input/, () => 'La consulta está incompleta.'],
    [/must appear in the GROUP BY clause/, () => 'Una columna del SELECT no está en el GROUP BY ni dentro de una función agregada.'],
    [/more than one row returned by a subquery/, () => 'La subconsulta devuelve más de una fila y se compara con un solo valor. Prueba con IN, ANY o ALL.'],
    [/duplicate key value/, () => 'Ya existe una fila con esa llave primaria.'],
    [/violates foreign key constraint/, () => 'El valor no existe en la tabla referenciada (llave foránea).'],
    [/violates check constraint/, () => 'El valor no cumple una restricción CHECK de la tabla.'],
  ];
  for (const [re, fn] of tips) {
    const m = msg.match(re);
    if (m) return { hint: fn(m), raw: msg };
  }
  return { hint: null, raw: msg };
}
