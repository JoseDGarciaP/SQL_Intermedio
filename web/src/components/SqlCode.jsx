// Resaltado de SQL liviano para los bloques de solo lectura.
const KEYWORDS = new Set(`select from where and or not in is null as on join inner left right full outer
group by having order asc desc distinct all any some exists between like limit offset union
insert into values update set delete create table schema drop alter primary key foreign references
constraint check varchar char integer date case when then else end cascade if`.split(/\s+/));
const FUNCS = new Set('count sum avg min max round extract year month day coalesce upper lower length now'.split(' '));

const TOKEN = /(--[^\n]*)|('(?:[^']|'')*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_ñÑ]*)|(<[a-z ]+>)|(\s+|.)/g;

export function tokenize(sql) {
  const out = [];
  let m;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(sql))) {
    const [t, cmt, str, num, word, placeholder] = m;
    if (cmt) out.push(['c', t]);
    else if (str) out.push(['s', t]);
    else if (num) out.push(['n', t]);
    else if (placeholder) out.push(['p', t]);
    else if (word) {
      const w = word.toLowerCase();
      if (KEYWORDS.has(w)) out.push(['k', t]);
      else if (FUNCS.has(w) && sql[m.index + t.length] === '(') out.push(['f', t]);
      else out.push(['', t]);
    } else out.push(['', t]);
  }
  return out;
}

export default function SqlCode({ sql, className = '' }) {
  return (
    <pre className={`code ${className}`}>
      <code>
        {tokenize(sql).map(([cls, text], i) =>
          cls ? <span key={i} className={`tk-${cls}`}>{text}</span> : text
        )}
      </code>
    </pre>
  );
}
