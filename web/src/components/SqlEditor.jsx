import CodeMirror from '@uiw/react-codemirror';
import { sql, PostgreSQL } from '@codemirror/lang-sql';
import { EditorView, keymap } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import { Prec } from '@codemirror/state';
import { useMemo, useRef } from 'react';
import { closeCompletion } from '@codemirror/autocomplete';

// Esquemas para el autocompletado (escuela.estudiante, supermarket.pedido, ...)
const SCHEMA = {
  'escuela.estudiante': ['codigo', 'nombre', 'genero', 'curso'],
  'escuela.curso': ['curso', 'nombre'],
  'tienda.producto': ['ref', 'pro', 'nombre', 'uni', 'precio'],
  'empresa.empleado': ['id_emp', 'nombre', 'salario', 'id_jefe'],
  'supermarket.cliente': ['id_c', 'nombre', 'sexo'],
  'supermarket.producto': ['ref', 'pro', 'nombre', 'uni', 'precio'],
  'supermarket.pedido': ['id_ped', 'fecha', 'id_c', 'total'],
  'supermarket.detalle_pedido': ['id_ped', 'ord', 'ref', 'id_pro', 'cant', 'vlr_unit'],
};

const highlight = HighlightStyle.define([
  { tag: t.keyword, color: 'var(--tk-k)', fontWeight: '600' },
  { tag: [t.function(t.variableName), t.standard(t.name)], color: 'var(--tk-f)' },
  { tag: [t.string, t.special(t.string)], color: 'var(--tk-s)' },
  { tag: [t.number, t.bool, t.null], color: 'var(--tk-n)' },
  { tag: [t.lineComment, t.blockComment, t.comment], color: 'var(--tk-c)', fontStyle: 'italic' },
  { tag: [t.operator, t.punctuation], color: 'var(--code-ink-2)' },
]);

const theme = EditorView.theme({
  '&': { backgroundColor: 'var(--code-bg)', color: 'var(--code-ink)', fontSize: '14px', borderRadius: '12px' },
  '.cm-content': { fontFamily: 'var(--mono)', padding: '12px 0', caretColor: 'var(--tk-k)' },
  '.cm-line': { padding: '0 14px' },
  '.cm-gutters': { display: 'none' },
  '&.cm-focused': { outline: '3px solid var(--focus)', outlineOffset: '2px' },
  '.cm-activeLine': { backgroundColor: 'rgba(255,255,255,.04)' },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': { backgroundColor: 'rgba(128,229,255,.25) !important' },
  '.cm-cursor': { borderLeftColor: 'var(--tk-k)', borderLeftWidth: '2px' },
  '.cm-tooltip': { border: '1px solid var(--line)', borderRadius: '8px', overflow: 'hidden' },
  '.cm-tooltip-autocomplete ul li[aria-selected]': { background: 'var(--brand)', color: '#fff' },
}, { dark: true });

export default function SqlEditor({ value, onChange, onRun, minHeight = '140px', autoFocus = false, label = 'Editor de consultas SQL' }) {
  // Guarda siempre la última función para que el atajo no use una versión vieja.
  const onRunRef = useRef(onRun);
  onRunRef.current = onRun;
  const runShortcut = (view) => {
    closeCompletion(view);
    onRunRef.current?.(view.state.doc.toString());
    return true;
  };

  const extensions = useMemo(() => [
    sql({ dialect: PostgreSQL, schema: SCHEMA, upperCaseKeywords: true }),
    syntaxHighlighting(highlight),
    theme,
    EditorView.lineWrapping,
    EditorView.contentAttributes.of({ 'aria-label': label }),
    Prec.highest(keymap.of([
      { key: 'Mod-Enter', run: runShortcut },
      { key: 'Shift-Enter', run: runShortcut },
    ])),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [label]);

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions}
      theme="none"
      minHeight={minHeight}
      autoFocus={autoFocus}
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
        highlightActiveLineGutter: false,
        autocompletion: true,
        bracketMatching: true,
        closeBrackets: true,
        indentOnInput: true,
        searchKeymap: false,
      }}
    />
  );
}
